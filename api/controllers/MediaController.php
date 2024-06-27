<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/Collage.php';
require_once __DIR__ . '/../responses/ErrorResponse.php';
require_once __DIR__ . '/../models/internal/DirectoryManager.php';
require_once __DIR__ . '/../models/internal/ImageManager.php';
require_once __DIR__ . '/../models/CollageType.php';
require_once __DIR__ . '/../models/Account.php';

class MediaController extends Controller {
	private $directoryManager;
	private $imageManager;

	public function __construct()
	{
		// Geen Dependency Injection, want boeit niet
		$this->directoryManager = new DirectoryManager("../assets/media/collages");
		$this->imageManager = new ImageManager($this->directoryManager);
	}

	public function getCollages() {
		if (!empty($_SESSION["account_ksaoosterzele"]) && isset($_GET['all']) && $_GET["all"] === "1") {
			$collages = Collage::with("types")->get();
		} else {
			$collages = Collage::where("active", 1)->with("types")->get();
		}

		exit(json_encode($collages));
	}

	public function getCollage() {
		if (empty($_GET['id'])) {
			ErrorResponse::exitWithError(400, "Gelieve een id mee te geven.");
		}

		$collage = Collage::find($_GET['id']);

		if (empty($collage)) {
			ErrorResponse::exitWithError(404, "Collage niet gevonden.");
		}

		$images = $this->directoryManager->getFilesFromDirectory($collage->name);
		$images = array_filter($images, function($image) {
			return $image !== "thumbnail.png";
		});

		exit(json_encode([
			"collage" => $collage,
			"images" => $images
		]));
	}

	public function getCollageTypes() {
		$types = CollageType::all();
		exit(json_encode($types));
	}

	public function addCollage() {
		$account = Account::is_authenticated();

		$data = json_decode(file_get_contents('php://input'), true);

		$errors = Collage::validate($data);

		if (!empty($errors)) {
			ErrorResponse::exitWithError(400, "Validatie fouten gevonden.", $errors);
		}

		$collage = new Collage();
		$collage->internal_name = strtolower(preg_replace('/[^a-zA-Z0-9]/', '_', $data["name"]));
		$collage->display_name = $data["name"];
		$collage->date = $data["date"];
		$collage->active = $data["active"];

		if ($this->directoryManager->doesDirectoryExist($collage->internal_name)) {
			ErrorResponse::exitWithError(400, "De directory van deze collagenaam bestaat al.");
		}

		$this->directoryManager->createDirectory($collage->name);

		$collage->save();

		http_response_code(201);
		exit();
	}

	public function updateCollage() {
		if (empty($_SESSION["admin_ksaoosterzele"])) {
			ErrorResponse::exitWithError(401, "U bent niet gemachtigd om deze actie uit te voeren.");
		}

		$data = json_decode(file_get_contents('php://input'), true);

		if (empty($data['id'])) {
			ErrorResponse::exitWithError(400, "Gelieve een id mee te geven.");
		}

		$collage = Collage::find($data['id']);

		if (empty($collage)) {
			ErrorResponse::exitWithError(404, "Collage niet gevonden.");
		}

		$errors = Collage::validate($data);

		if (!empty($errors)) {
			ErrorResponse::exitWithError(400, "Validatie fouten gevonden.", $errors);
		}

		$collage->displayName = $data["displayName"];
		$collage->date = $data["date"];
		$collage->active = !empty($data["active"]);
		$collage->save();

		http_response_code(201);
		exit();
	}

	public function deleteCollage()
	{
		if (empty($_SESSION["admin_ksaoosterzele"])) {
			ErrorResponse::exitWithError(401);
		}

		if (empty($_GET['id'])) {
			ErrorResponse::exitWithError(400, "Gelieve een id mee te geven.");
		}

		$collage = Collage::find($_GET['id']);

		if (empty($collage)) {
			ErrorResponse::exitWithError(404, "Collage niet gevonden.");
		}

		if (!$this->directoryManager->doesDirectoryExist($collage->name)) {
			ErrorResponse::exitWithError(404, "Directory van deze collage bestaat niet. Controleer zeker voor duplicaten.");
		}
		
		try {
			$this->directoryManager->removeDirectory($collage->name, $this->directoryManager->getFilesFromDirectory($collage->name));
		} catch (Throwable $e) {
			ErrorResponse::exitWithError(500, "Er was een probleem bij het verwijderen van de collage.", ["error" => $e.getMessage()]);
		}

		$collage->delete();

		http_response_code(200);
		exit();
	}

	public function addCollageImages() {
		if (empty($_SESSION["admin_ksaoosterzele"])) {
			ErrorResponse::exitWithError(401);
		}

		if (empty($_GET['id'])) {
			ErrorResponse::exitWithError(400, "Gelieve een id mee te geven.");
		}

		$collage = Collage::find($_GET['id']);

		if (empty($collage)) {
			ErrorResponse::exitWithError(404, "Collage niet gevonden.");
		}

		$images = $this->_addImagesToCollage($collage->name, $_FILES["images"]);

		$this->imageManager->generateThumbnail($collage->name);

		exit(json_encode($images));
	}

	public function deleteCollageImage() {
		if (empty($_SESSION["admin_ksaoosterzele"])) {
			ErrorResponse::exitWithError(401);
		}

		if (empty($_GET['id']) || empty($_GET['image'])) {
			ErrorResponse::exitWithError(400, "Gelieve een id en image mee te geven.");
		}

		$collage = Collage::find($_GET['id']);

		if (empty($collage)) {
			ErrorResponse::exitWithError(404, "Collage niet gevonden.");
		}

		$target = $this->directoryManager->getTargetDir() . DIRECTORY_SEPARATOR . $collage->name . DIRECTORY_SEPARATOR . $_GET['image'];

		if (!file_exists($target)) {
			ErrorResponse::exitWithError(404, "Afbeelding niet gevonden.");
		}

		unlink($target);

		$this->imageManager->generateThumbnail($collage->name);

		http_response_code(200);
		exit();
	}

	public function getCollageImages() {
		if (empty($_GET['id'])) {
			ErrorResponse::exitWithError(400, "Gelieve een id mee te geven.");
		}

		$collage = Collage::find($_GET['id']);

		if (empty($collage)) {
			ErrorResponse::exitWithError(404, 'Collage niet gevonden.');
		}

		$images = $this->directoryManager->getFilesFromDirectory($collage->name);
		$images = array_filter($images, function ($image) {
			return $image !== "thumbnail.png";
		});

		exit(json_encode($images));
	}

	/**
	 * Voegt afbeeldingen toe aan een collage en hun thumbnails.
	*/
	private function _addImagesToCollage($collageName, $images) {

		// Maximum file size in bytes
		$maxFileSize = 1.5 * 1024 * 1024;
		$returnImages = [];

		// Loop over alle afbeeldingen
		for ($i = 0; $i < count($images['name']); $i++) {
			// tmpFile is de tijdelijke locatie van de afbeelding in cache
			$tmpFile = $images['tmp_name'][$i];

			if (file_exists($this->directoryManager->getTargetDir() . DIRECTORY_SEPARATOR . $collageName . DIRECTORY_SEPARATOR . $images['name'][$i])) {
				break;
			}

			/** 
			 * Check of de afbeelding groter is dan de maximum file size
			 * 	Zo ja, comprimeer de afbeelding en sla die gecomprimeerde versie op
			 * 	Zo nee, sla de afbeelding op in de collage directory zonder compressie rechtstreeks vanuit de cache
			*/
			if (filesize($tmpFile) > $maxFileSize) {
				$compressedImage = $this->imageManager->compressImage($tmpFile, $maxFileSize);
				$imageData = $this->imageManager->createImage($compressedImage, null);
				imagedestroy($compressedImage);

				$this->directoryManager->addFileToDirectory($collageName, $images['name'][$i], $imageData);
			} else {
				$fileName = $collageName . DIRECTORY_SEPARATOR . $images['name'][$i];
				$this->directoryManager->moveUploadedFileToDirectory($tmpFile, $fileName);
			}

			$returnImages[] = $images['name'][$i];
			$this->_addThumbnailForImage($collageName, $images['name'][$i]);
		}

		return $returnImages;
	}

	private function _addThumbnailForImage($collageName, $imageName)
	{
		// Als de thumbnail directory nog niet bestaat, maak deze aan
		$thumbnailDir = $collageName . DIRECTORY_SEPARATOR . "thumbnails";
		if (!$this->directoryManager->doesDirectoryExist($thumbnailDir)) {
			$this->directoryManager->createDirectory($thumbnailDir);
		}

		$collageDir = $this->directoryManager->getTargetDir() . DIRECTORY_SEPARATOR . $collageName;

		// File paths for the original image and the thumbnail
		$originalImagePath = $collageDir . DIRECTORY_SEPARATOR . $imageName;
		$thumbnailPath = $collageDir . DIRECTORY_SEPARATOR . "thumbnails" . DIRECTORY_SEPARATOR . $imageName;

		// Load the original image
		$thumbnailImage = $this->imageManager->loadAndCropImage($originalImagePath, 300, 150);

		if ($thumbnailImage !== false) {
			// Save the cropped thumbnail image
			imagejpeg($thumbnailImage, $thumbnailPath, 85);

			// Free up memory
			imagedestroy($thumbnailImage);
		}
	}
}
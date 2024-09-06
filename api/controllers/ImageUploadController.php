<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/WorkingYear.php';
require_once __DIR__ . '/../models/Account.php';
require_once __DIR__ . '/../responses/ErrorResponse.php';

class ImageUploadController extends Controller {

    public function uploadImage() {
        if (empty($_FILES['image'])) {
            ErrorResponse::exitWithError(400, "No image uploaded.");
        }

        $folder = $_POST['folder'] ?? 'uploads';
        $targetDir = __DIR__ . '/../../assets' . DIRECTORY_SEPARATOR . $folder;
        $targetFile = $targetDir . DIRECTORY_SEPARATOR . basename($_FILES["image"]["name"]);

        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
            $imagePath = '/assets/' . $folder . DIRECTORY_SEPARATOR . basename($_FILES["image"]["name"]);
            exit(json_encode(['imagePath' => $imagePath]));
        } else {
            ErrorResponse::exitWithError(500, "Failed to upload image.");
        }
    }

    public function checkIfImageAlreadyExists() {
        if (empty($_GET['name']) || empty($_GET['folder'])) {
            ErrorResponse::exitWithError(400, "Geen afbeeldingnaam of destinatie opgegeven.");
        }

        $imageName = $_GET['name'];
        $imageDestination = $_GET['folder'];

        if (file_exists(__DIR__ . '/../assets/' . $imageDestination . '/' . $imageName)) {
            exit(json_encode(['exists' => true]));
        } else {
            exit(json_encode(['exists' => false]));
        }
    }
}


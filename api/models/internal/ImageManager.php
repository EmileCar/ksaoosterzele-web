<?php

class ImageManager {

    private $directoryManager;

    public function __construct($directoryManager) {
        $this->directoryManager = $directoryManager;
    }

    public function compressImage($source, $maxFileSize = 1920) {
        $originalImage = imagecreatefromstring(file_get_contents($source));

        $exif = @exif_read_data($source);
        $orientation = $exif['Orientation'] ?? 1;

        // Rotate image if needed based on EXIF orientation
        if (in_array($orientation, [5, 6, 7, 8])) {
            $originalImage = imagerotate($originalImage, $this->_getRotationDegrees($orientation), 0);
        }

        $width = imagesx($originalImage);
        $height = imagesy($originalImage);

        $aspectRatio = $width / $height;
        $newWidth = 0;
        $newHeight = 0;
        if ($width > $height) {
            $newWidth = min($maxFileSize, $width);
            $newHeight = $newWidth / $aspectRatio;
        } else {
            $newHeight = min($maxFileSize, $height);
            $newWidth = $newHeight * $aspectRatio;
        }

        // Create a new image with the compressed dimensions
        $compressedImage = imagecreatetruecolor($newWidth, $newHeight);
        imagecopyresampled($compressedImage, $originalImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
        imagedestroy($originalImage);

        return $compressedImage;
    }

    public function createImage($image, $destination, $quality = 85) {
        ob_start();
        imagejpeg($image, $destination, $quality);
        $imageData = ob_get_clean();

        return $imageData;
    }

    /**
     * Genereert automatisch een thumbnail voor een collage op basis van de eerste 4 afbeeldingen.
     */
    public function generateThumbnail($collageName)
    {
        // Verwijder de thumbnail als deze al bestaat
        $this->directoryManager->removeFileFromDirectory($collageName, 'thumbnail.png');

        // Lijst van afbeeldingen in de collage directory
        $images = $this->directoryManager->getFilesFromDirectory($collageName);

        // Thumbnail afmetingen
        $thumbnailWidth = 600;
        $thumbnailHeight = 440;
        $gap = 8;

        // Maak een nieuw canvas voor de thumbnail
        $thumbnailCanvas = imagecreatetruecolor($thumbnailWidth, $thumbnailHeight);
        $white = imagecolorallocate($thumbnailCanvas, 255, 255, 255);
        imagefill($thumbnailCanvas, 0, 0, $white);

        // Aantal afbeeldingen beperken tot 4
        $count = count($images);

        if ($count == 0) {
            imagedestroy($thumbnailCanvas);
            return;
        }

        $limit = min($count, 4);
        $segmentWidth = $thumbnailWidth / ($limit >= 2 ? 2 : 1);
        $segmentHeight = $thumbnailHeight / ($limit > 2 ? 2 : 1);

        for ($i = 0; $i < $limit && $i < $count; $i++) {
            $imagePath = $this->directoryManager->getTargetDir() . DIRECTORY_SEPARATOR . $collageName . DIRECTORY_SEPARATOR . $images[$i];

            // Attempt to load the image
            $sourceImage = $this->loadAndCropImage($imagePath, $segmentWidth, $segmentHeight);

            // If loading fails, continue to the next image
            if ($sourceImage === false) {
                continue;
            }

            // Calculate coordinates for the current segment
            $x = ($i % 2) * ($thumbnailWidth / 2 + $gap);
            $y = floor($i / 2) * ($thumbnailHeight / 2 + $gap);

            // Copy the image onto the thumbnail canvas
            imagecopyresampled($thumbnailCanvas, $sourceImage, $x, $y, 0, 0, $segmentWidth, $segmentHeight, imagesx($sourceImage), imagesy($sourceImage));
            imagedestroy($sourceImage);
        }

        $thumbnailData = $this->createImage($thumbnailCanvas, null, 100);
        $thumbnailPath = $this->directoryManager->getTargetDir() . DIRECTORY_SEPARATOR . $collageName . '/thumbnail.png';

        file_put_contents($thumbnailPath, $thumbnailData);

        imagedestroy($thumbnailCanvas);
    }

    public function loadAndCropImage($imagePath, $width, $height)
    {
        $imageInfo = getimagesize($imagePath);
        if ($imageInfo !== false && function_exists('exif_read_data')) {
            // Extract EXIF orientation information
            try {
                $exif = @exif_read_data($imagePath);
            } catch (Exception $e) {
                $exif = null;
            }
            $orientation = $exif['Orientation'] ?? 1;

            $imageType = $imageInfo[2];
            switch ($imageType) {
                case IMAGETYPE_JPEG:
                    $sourceImage = imagecreatefromjpeg($imagePath);
                    break;
                case IMAGETYPE_PNG:
                    $sourceImage = imagecreatefrompng($imagePath);
                    break;
                case IMAGETYPE_GIF:
                    $sourceImage = imagecreatefromgif($imagePath);
                    break;
                case IMAGETYPE_BMP:
                    $sourceImage = imagecreatefrombmp($imagePath);
                    break;
                case IMAGETYPE_WEBP:
                    $sourceImage = imagecreatefromwebp($imagePath);
                    break;
                default:
                    return false;
            }

            // Rotate image if needed based on EXIF orientation
            if (in_array($orientation, [5, 6, 7, 8])) {
                $sourceImage = imagerotate($sourceImage, $this->_getRotationDegrees($orientation), 0);
            }

            $croppedImage = imagecreatetruecolor($width, $height);

            $sourceWidth = imagesx($sourceImage);
            $sourceHeight = imagesy($sourceImage);

            $sourceAspectRatio = $sourceWidth / $sourceHeight;
            $targetAspectRatio = $width / $height;

            if ($sourceAspectRatio > $targetAspectRatio) {
                $cropWidth = intval($sourceHeight * $targetAspectRatio);
                $cropX = intval(($sourceWidth - $cropWidth) / 2);
                imagecopyresampled($croppedImage, $sourceImage, 0, 0, $cropX, 0, $width, $height, $cropWidth, $sourceHeight);
            } else {
                $cropHeight = intval($sourceWidth / $targetAspectRatio);
                $cropY = intval(($sourceHeight - $cropHeight) / 2);
                imagecopyresampled($croppedImage, $sourceImage, 0, 0, 0, $cropY, $width, $height, $sourceWidth, $cropHeight);
            }

            imagedestroy($sourceImage);

            return $croppedImage;
        }

        return false;
    }

    private function _getRotationDegrees($orientation)
    {
        switch ($orientation) {
            case 5:
                return 270;
            case 6:
                return 270;
            case 7:
                return 90;
            case 8:
                return 270;
            default:
                return 0;
        }
    }
}
<?php

class DirectoryManager {
    // Properties
    private $targetDir;
    
    // Constructor
    public function __construct($targetDir = null) {
        $this->targetDir = $targetDir;
    }
    
    public function getFilesFromDirectory($subDirName = null, $limit = null) {
        $files = [];

        $subDir = $this->targetDir . DIRECTORY_SEPARATOR . $subDirName;

        if (is_dir($subDir)) {
            $files = array_filter(scandir($subDir), function($file) use ($subDir) {
                return is_file($subDir . DIRECTORY_SEPARATOR . $file);
            });

            if ($limit !== null) {
                $files = array_slice($files, 0, $limit);
            }

            $files = array_values($files);
        }

        return $files;
    }

    public function createDirectory($dirName) {
        $dir = $this->targetDir . DIRECTORY_SEPARATOR . $dirName;

        if (!is_dir($dir)) {
            mkdir($dir);
        }
    }

    public function doesDirectoryExist($dirName) {
        $dir = $this->targetDir . DIRECTORY_SEPARATOR . $dirName;

        return is_dir($dir);
    }

    public function addFilesToDirectory($subDirName, $files) {
        $subDir = $this->targetDir . DIRECTORY_SEPARATOR . $subDirName;

        if (!is_dir($subDir)) {
            $this->createDirectory($subDirName);
        }

        foreach ($files as $file) {
            $file = $subDir . DIRECTORY_SEPARATOR . $file;

            if (!file_exists($file)) {
                file_put_contents($file, '');
            }
        }
    }

    public function addFileToDirectory($subDirName, $fileName, $content) {
        $subDir = $this->targetDir . DIRECTORY_SEPARATOR . $subDirName;
        $file = $subDir . DIRECTORY_SEPARATOR . $fileName;

        if (!is_dir($subDir)) {
            $this->createDirectory($subDirName);
        }

        try {
            file_put_contents($file, $content);
        } catch (Throwable $e) {
            return $e;
        }
    }

    public function moveUploadedFileToDirectory($from, $fileName) {
        $subDir = $this->targetDir . DIRECTORY_SEPARATOR . $fileName;
        move_uploaded_file($from, $subDir);
    }

    public function removeFilesFromDirectory($subDirName, $files) {
        $subDir = $this->targetDir . DIRECTORY_SEPARATOR . $subDirName;

        foreach ($files as $file) {
            $file = $subDir . DIRECTORY_SEPARATOR . $file;

            if (file_exists($file)) {
                unlink($file);
            }
        }
    }

    public function removeDirectory($dirName) {
        $dir = $this->targetDir . DIRECTORY_SEPARATOR . $dirName;

        if (is_dir($dir)) {
            $handle = opendir($dir);

            while (($item = readdir($handle)) !== false) {
                if ($item !== '.' && $item !== '..') {
                    $path = $dir . DIRECTORY_SEPARATOR . $item;

                    if (is_dir($path)) {
                        $this->removeDirectory($dirName . DIRECTORY_SEPARATOR . $item);
                    } else {
                        unlink($path);
                    }
                }
            }

            closedir($handle);
            rmdir($dir);
        }
    }

    public function removeFileFromDirectory($subDirName, $fileName) {
        $subDir = $this->targetDir . DIRECTORY_SEPARATOR . $subDirName;
        $file = $subDir . DIRECTORY_SEPARATOR . $fileName;

        if (file_exists($file)) {
            unlink($file);
        }
    }

    public function compressImage($subDirName, $fileName, $quality = 75) {
        $subDir = $this->targetDir . DIRECTORY_SEPARATOR . $subDirName;
        $file = $subDir . DIRECTORY_SEPARATOR . $fileName;

        if (file_exists($file)) {
            $image = imagecreatefromstring(file_get_contents($file));

            if ($image !== false) {
                imagejpeg($image, $file, $quality);
                imagedestroy($image);
            }
        }
    }

    public function getTargetDir() {
        return $this->targetDir;
    }
}
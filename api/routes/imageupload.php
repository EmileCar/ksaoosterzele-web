<?php
$imageUploadRoutes = [
    'upload_image' => array(
        'controller' => 'ImageUpload',
        'methods' => array(
            'POST'=> 'uploadImage',
        )
    ),
    'check_if_image_exists' => array(
        'controller' => 'ImageUpload',
        'methods' => array(
            'GET'=> 'checkIfImageAlreadyExists',
        )
    ),
];
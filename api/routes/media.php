<?php
$mediaRoutes = [
    'collages' => array(
        'controller' => 'Media',
        'methods' => array(
            'GET' => 'getCollages',
        )
    ),
    'collage' => array(
        'controller' => 'Media',
        'methods' => array(
            'GET' => 'getCollage',
            'POST' => 'addCollage',
            'PUT' => 'updateCollage',
            'DELETE' => 'deleteCollage'
        )
    ),
    'collage_images' => array(
        'controller' => 'Media',
        'methods' => array(
            'GET'=> 'getCollageImages',
            'POST' => 'addCollageImages',
        )
    ),
    'collage_image' => array(
        'controller' => 'Media',
        'methods' => array(
            'DELETE' => 'deleteCollageImage'
        )
    ),
];
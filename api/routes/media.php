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
            'POST' => 'addCollageImages',
        )
    ),
    'collage_image' => array(
        'controller' => 'Media',
        'methods' => array(
            'DELETE' => 'deleteCollageImage'
        )
    ),
    'collage_types' => array(
        'controller' => 'Media',
        'methods' => array(
            'GET' => 'getCollageTypes',
        )
    ),
];
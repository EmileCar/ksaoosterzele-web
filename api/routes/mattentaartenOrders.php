<?php
$mattentaartenOrderRoutes = [
    'mattentaart_orders' => array(
        'controller' => 'MattentaartOrder',
        'methods' => array(
            'GET' => 'getMattentaartenOrders',
        )
    ),
    'mattentaart_order' => array(
        'controller' => 'MattentaartOrder',
        'methods' => array(
            'POST' => 'addMattentaartenOrder',
            'PUT' => 'updateMattentaartenOrder',
            'DELETE' => 'deleteMattentaartenOrder'
        )
    ),
    'mattentaart_data' => array(
        'controller' => 'MattentaartOrder',
        'methods' => array(
            'GET' => 'getMattentaartData'
        )
    ),
    'leiding_mattentaart_orders' => array(
        'controller' => 'MattentaartOrder',
        'methods' => array(
            'GET' => 'getLeidingOrders'
        )
    ),
    'leiding_mattentaart_order' => array(
        'controller' => 'MattentaartOrder',
        'methods' => array(
            'POST' => 'addLeidingOrder',
            'PUT' => 'updateLeidingOrder'
        )
        ),
    'mattentaart_order_verstuurEenMail' => array(
        'controller' => 'MattentaartOrder',
        'methods' => array(
            'POST' => 'sendMailToCustomer'
        )
    )
];
<?php
$invoiceRoutes = [
    'invoices' => array(
        'controller' => 'Invoice',
        'methods' => array(
            'GET' => 'getInvoices',
        )
    ),
    'invoice' => array(
        'controller' => 'Invoice',
        'methods' => array(
            'GET' => 'getInvoice',
            'POST' => 'addInvoice',
            'PUT' => 'updateInvoice',
            'DELETE' => 'deleteInvoice'
        )
    ),
    'invoice_summary' => array(
        'controller' => 'Invoice',
        'methods' => array(
            'GET' => 'getInvoiceSummary',
        )
    ),
];
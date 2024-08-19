<?php
$invoiceRoutes = [
    'invoices_leader' => array(
        'controller' => 'Invoice',
        'methods' => array(
            'GET' => 'getInvoicesOfLeader',
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
    'invoice_statistics' => array(
        'controller' => 'Invoice',
        'methods' => array(
            'GET' => 'getInvoiceStatistics',
        )
    ),
    'invoices' => array(
        'controller' => 'Invoice',
        'methods' => array(
            'POST' => 'addInvoices',
        )
    ),
];
<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/Invoice.php';
require_once __DIR__ . '/../models/Leader.php';
require_once __DIR__ . '/../responses/ErrorResponse.php';
use Carbon\Carbon;

class InvoiceController extends Controller {

	public function getInvoiceSummary() {
        $account = Account::is_authenticated();

        $leaders = Leader::with(['invoices' => function($query) {
            $query->selectRaw('leader_id, SUM(amount) as total_gross_amount')
                  ->groupBy('leader_id');
        }])->get();

        foreach ($leaders as $leader) {
            $leader->most_recent_invoice = $leader->invoices()->orderBy('created_at', 'desc')->first();
        }

        $result = [];
        foreach ($leaders as $leader) {
            $result[] = [
                'first_name' => $leader->first_name,
                'last_name' => $leader->last_name,
                'total_gross_amount' => $leader->invoices->first() ? $leader->invoices->first()->total_gross_amount : 0,
                'most_recent_invoice' => $leader->most_recent_invoice ? [
					'name' => $leader->most_recent_invoice->name,
                    'amount' => $leader->most_recent_invoice->amount,
                    'created_at' => $leader->most_recent_invoice->created_at
                ] : null
            ];
        }

		usort($result, function($a, $b) {
            return $b['total_gross_amount'] <=> $a['total_gross_amount'];
        });

		exit(json_encode($result));
	}

    public function addInvoice() {
        $account = Account::is_authenticated();
        Account::is_authorised($account, 2);

        $data = json_decode(file_get_contents('php://input'), true);

        $errors = Invoice::validate($data);

        if (!empty($errors)) {
            ErrorResponse::exitWithError(400, "Validatie fouten gevonden.", $errors);
        }

        $invoice = new Invoice();
        $invoice = Invoice::create($data, $invoice);
        $invoice->save();

		http_response_code(201);
		exit();
    }
}

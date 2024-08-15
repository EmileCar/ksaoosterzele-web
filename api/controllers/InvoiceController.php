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
                'leader_id' => $leader->id,
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

    public function getInvoicesOfLeader() {
        $account = Account::is_authenticated();
        Account::is_authorised($account, 2);

        if (!isset($_GET['leader_id'])) {
            ErrorResponse::exitWithError(400, "Gelieve een leider ID mee te geven.");
        }

        $leaderId = $_GET['leader_id'];

        $leader = Leader::with(['invoices' => function($query) {
            $query->orderBy('created_at', 'desc');
        }])->find($leaderId);

        if (!$leader) {
            ErrorResponse::exitWithError(404, "Leider niet gevonden.");
        }

        $totalGrossAmount = $leader->invoices->sum('amount');

        $response = [
            'leader_name' => $leader->first_name . ' ' . $leader->last_name,
            'total_gross_amount' => $totalGrossAmount,
            'invoices' => $leader->invoices->map(function($invoice) {
                return [
                    'id' => $invoice->id,
                    'name' => $invoice->name,
                    'amount' => $invoice->amount,
                    'remarks' => $invoice->remarks,
                    'created_at' => $invoice->created_at,
                    'updated_at' => $invoice->updated_at
                ];
            })
        ];

        exit(json_encode($response));
    }

    public function getInvoiceStatistics() {
        $account = Account::is_authenticated();
        Account::is_authorised($account, 2);

        $totalAmountCollected = Invoice::sum('amount');

        $totalInvoicesIssued = Invoice::count();

        $monthlyInvoicesCount = Invoice::selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as count')
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();

        $monthlyRevenueAmount = Invoice::selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, SUM(amount) as total')
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();

        $statistics = [
            'total_amount_collected' => $totalAmountCollected,
            'total_invoices_issued' => $totalInvoicesIssued,
            'monthly_invoices_count' => $monthlyInvoicesCount,
            'monthly_revenue_amount' => $monthlyRevenueAmount
        ];

        exit(json_encode($statistics));
    }
}

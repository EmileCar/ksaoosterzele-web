class InvoiceSummary {
    leaderId: number;
    firstName: string;
    lastName: string;
    totalGrossAmount: number;
    mostRecentInvoice: Invoice | null;

    constructor(invoiceSummaryData?: any) {
        this.leaderId = invoiceSummaryData.leader_id || null
        this.firstName = invoiceSummaryData.first_name || null;
        this.lastName = invoiceSummaryData.last_name || null;
        this.totalGrossAmount = invoiceSummaryData.total_gross_amount || 0;
        this.mostRecentInvoice = invoiceSummaryData.most_recent_invoice ? new Invoice(invoiceSummaryData.most_recent_invoice) : null;
    }
}

class InvoiceOfLeaderResponse {
    leaderName: string;
    totalGrossAmount: number;
    invoices: Invoice[];

    constructor(invoiceOfLeaderData?: any) {
        this.leaderName = invoiceOfLeaderData.leader_name || null;
        this.totalGrossAmount = invoiceOfLeaderData.total_gross_amount || 0;
        this.invoices = invoiceOfLeaderData.invoices.map((invoice: any) => new Invoice(invoice)) || [];
    }
}

class Invoice {
    id: number;
    leaderId: number;
    name: string;
    amount: number;
    remarks: string;
    workingYearId: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(invoiceData?: any) {
        this.id = invoiceData.id || null;
        this.leaderId = invoiceData.leader_id || null;
        this.name = invoiceData.name || null;
        this.amount = invoiceData.amount || null;
        this.remarks = invoiceData.remarks || null;
        this.workingYearId = invoiceData.working_year_id || null;
        this.createdAt = new Date(invoiceData.created_at) || new Date();
        this.updatedAt = new Date(invoiceData.updated_at) || new Date();
    }
}

class SendInvoice {
    leaderId: number;
    name: string;
    amount: number;
    remarks: string;

    constructor(sendInvoiceData?: any) {
        this.leaderId = sendInvoiceData.leaderId || null;
        this.name = sendInvoiceData.name || null;
        this.amount = sendInvoiceData.amount || null;
        this.remarks = sendInvoiceData.remarks || null;
    }
}

class MonthlyRevenue {
    year: number;
    month: number;
    count: number;
    total: number;

    constructor(monthlyRevenueData: any) {
        this.year = monthlyRevenueData.year || null;
        this.month = monthlyRevenueData.month || null;
        this.count = monthlyRevenueData.count || 0;
        this.total = monthlyRevenueData.total || 0;
    }
}

class InvoiceStatistics {
    totalAmountCollected: number;
    totalInvoicesIssued: number;
    monthlyInvoicesCount: MonthlyRevenue[];
    monthlyRevenueAmount: MonthlyRevenue[];

    constructor(invoiceStatisticsData?: any) {
        this.totalAmountCollected = invoiceStatisticsData.total_amount_collected || 0;
        this.totalInvoicesIssued = invoiceStatisticsData.total_invoices_issued || 0;
        this.monthlyInvoicesCount = invoiceStatisticsData.monthly_invoices_count.map((data: any) => new MonthlyRevenue(data)) || [];
        this.monthlyRevenueAmount = invoiceStatisticsData.monthly_revenue_amount.map((data: any) => new MonthlyRevenue(data)) || [];
    }
}

export default Invoice;
export { InvoiceSummary, SendInvoice, InvoiceOfLeaderResponse };
export { InvoiceStatistics, MonthlyRevenue };
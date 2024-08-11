class InvoiceSummary {
    firstName: string;
    lastName: string;
    totalGrossAmount: number;
    mostRecentInvoice: Invoice | null;

    constructor(invoiceSummaryData?: any) {
        this.firstName = invoiceSummaryData.first_name || null;
        this.lastName = invoiceSummaryData.last_name || null;
        this.totalGrossAmount = invoiceSummaryData.total_gross_amount || null;
        this.mostRecentInvoice = invoiceSummaryData.most_recent_invoice ? new Invoice(invoiceSummaryData.most_recent_invoice) : null;
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

export default Invoice;
export { InvoiceSummary };
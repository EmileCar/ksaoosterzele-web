import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { getInvoicesOfLeader } from "../../../../services/invoiceService";
import useFetch from "../../../../hooks/useFetch";
import FetchedDataLayout from "../../../../layouts/FetchedDataLayout";
import Invoice from "../../../../types/Invoice";
import SectionTitle from "../../../../components/sectionTitle/SectionTitle";
import { getLeader } from "../../../../services/leaderService";
import Leader from "../../../../types/Leader";
import { formatDateToDate } from "../../../../utils/datetimeUtil";
import { Table } from "../../../../components/table/Table";
import { Column } from "../../../../components/table/Column";
import ReturnLink from "../../../../components/returnlink/ReturnLink";

const RekeningenLeider = () => {
		const { id } = useParams();
		const fetchInvoicesOfLeader = useCallback(() => getInvoicesOfLeader(id as unknown as number), [id]);
		const { pending, data: invoices, error } = useFetch<Invoice[]>(fetchInvoicesOfLeader);
		const fetchLeader = useCallback(() => getLeader(id as unknown as number), [id]);
		const { pending: pendingLeader, data: leader, error: errorLeader } = useFetch<Leader>(fetchLeader);

		const calculateTotal = (invoices: Invoice[]): number => {
			if (!invoices) return 0;

			return invoices.reduce((acc, invoice) => acc + Number(invoice.amount), 0);
		};

		return (
			<FetchedDataLayout isPending={pendingLeader} error={errorLeader}>
				{leader && (
					<>
						<ReturnLink url="/admin/rekeningen" text="Terug naar overzicht" />
						<SectionTitle title={`Rekeningen van ${leader.firstName} ${leader.lastName}`}>
							<p>Dit is het overzicht van alle transacties van leider {leader.firstName} {leader.lastName}.</p>
							<p>Momenteel zit zijn totale rekening op € {calculateTotal(invoices!)}.</p>
						</SectionTitle>
						<FetchedDataLayout isPending={pending} error={error}>
						{invoices && invoices.length === 0 && (
							<p>Geen rekeningen gevonden.</p>
						)}
						{invoices && invoices.length > 0 && (
							<Table
								values={invoices}
								rows={10}
								responsiveLayout="scroll"
							>
								<Column
									field="name"
									header="Naam"
								/>
								<Column
									field="totalGrossAmount"
									header="Bedrag"
									body={(rowData: Invoice) => `€ ${rowData.amount}`}
									sortable
									sortFunction={(a, b, sortDirection) => {
										const valueA = a.amount;
										const valueB = b.amount;
										return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
									}}
								/>
								<Column
									field="createdAt"
									header="Op datum"
									body={(rowData: Invoice) =>
										rowData.createdAt
											? `${formatDateToDate(rowData.createdAt, true)}`
											: "/"
									}
									sortable
									sortFunction={(a, b, sortDirection) => {
										const valueA = a.createdAt ? new Date(a.createdAt) : new Date(0);
										const valueB = b.createdAt ? new Date(b.createdAt) : new Date(0);
										return sortDirection === 'asc' ? valueA.getTime() - valueB.getTime() : valueB.getTime() - valueA.getTime();
									}
								}/>
							</Table>
						)}
						</FetchedDataLayout>
					</>
				)}
			</FetchedDataLayout>
		);
};

export default RekeningenLeider;
import { useCallback, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getInvoicesOfLeader } from "../../../../services/invoiceService";
import useFetch from "../../../../hooks/useFetch";
import FetchedDataLayout from "../../../../layouts/FetchedDataLayout";
import Invoice from "../../../../types/Invoice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import SectionTitle from "../../../../components/sectionTitle/SectionTitle";
import { getLeader } from "../../../../services/leaderService";
import Leader from "../../../../types/Leader";
import { formatDateTime } from "../../../../utils/datetimeUtil";

const RekeningenLeider = () => {
		const { id } = useParams();
		const fetchInvoicesOfLeader = useCallback(() => getInvoicesOfLeader(id as unknown as number), [id]);
		const { pending, data: invoices, error } = useFetch<Invoice[]>(fetchInvoicesOfLeader);
		const fetchLeader = useCallback(() => getLeader(id as unknown as number), [id]);
		const { pending: pendingLeader, data: leader, error: errorLeader } = useFetch<Leader>(fetchLeader);

		const createdAtBodyTemplate = (rowData: Invoice) => {
			const formattedDateTime = formatDateTime(rowData.createdAt);
			return (
				<div className="flex align-items-center gap-2">
					<span>{formattedDateTime}</span>
				</div>
			);
		};

		const amountBodyTemplate = (rowData: Invoice) => {
			return `€ ${rowData.amount}`;
		};

		return (
			<FetchedDataLayout isPending={pendingLeader} error={errorLeader}>
				{leader && (
					<>
						<div className="top__nav--buttons">
							<Link to="/admin/rekeningen" className="cursive">{`<< Terug naar overzicht`}</Link>
						</div>
						<SectionTitle title={`Rekeningen van ${leader.firstName} ${leader.lastName}`} />
						<FetchedDataLayout isPending={pending} error={error}>
							<DataTable
								value={invoices || []}
								className="invoices-table"
								style={{ width: '100%' }}
								emptyMessage="Er zijn nog geen transacties gevonden."
							>
								<Column field="name" header="Naam" sortable/>
								<Column field="amount" header="Bedrag" sortable body={amountBodyTemplate}/>
								<Column field="created_at" body={createdAtBodyTemplate} header="Toegevoegd op" sortable></Column>
							</DataTable>
						</FetchedDataLayout>
					</>
				)}
			</FetchedDataLayout>
		);
};

export default RekeningenLeider;
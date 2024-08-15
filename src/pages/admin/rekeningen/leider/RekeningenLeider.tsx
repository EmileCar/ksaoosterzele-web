import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { getInvoicesOfLeader } from "../../../../services/invoiceService";
import useFetch from "../../../../hooks/useFetch";
import FetchedDataLayout from "../../../../layouts/FetchedDataLayout";
import Invoice, { InvoiceOfLeaderResponse } from "../../../../types/Invoice";
import SectionTitle from "../../../../components/sectionTitle/SectionTitle";
import { formatDateToDate } from "../../../../utils/datetimeUtil";
import { Table } from "../../../../components/table/Table";
import { Column } from "../../../../components/table/Column";
import ReturnLink from "../../../../components/returnlink/ReturnLink";
import { usePopupContext } from "../../../../contexts/PopupContext";
import InvoiceDetailPopup from "../../../../components/invoices/popups/InvoiceDetailPopup";

const RekeningenLeider = () => {
		const { id } = useParams();
		const fetchInvoicesOfLeader = useCallback(() => getInvoicesOfLeader(id as unknown as number), [id]);
		const { pending, data: invoicesData, error } = useFetch<InvoiceOfLeaderResponse>(fetchInvoicesOfLeader);
		const { registerPopup } = usePopupContext();

		const openDetailPopup = (invoice: Invoice) => {
			registerPopup(<InvoiceDetailPopup invoice={invoice} name={invoicesData?.leaderName ?? ""} onClose={() => {}} />);
		}

		const renderIcons = (rowData: Invoice) => {
			if (rowData.remarks) {
				return (
					<div className="table-row-icon">
						<i className="pi pi-align-center"></i>
					</div>
				);
			}

			return null;
		}

		return (
			<>
				<ReturnLink url="/admin/rekeningen" text="Terug naar overzicht" />
				<FetchedDataLayout isPending={pending} error={error}>
					<SectionTitle title={`Rekeningen van ${invoicesData?.leaderName}`}>
						<p>Dit is het overzicht van alle transacties van leider {invoicesData?.leaderName}.</p>
						<p>Momenteel zit zijn totale rekening op € {invoicesData?.totalGrossAmount ?? 0}.</p>
					</SectionTitle>
					{invoicesData?.invoices && invoicesData.invoices.length === 0 && (
						<p>Geen rekeningen gevonden.</p>
					)}
					{invoicesData && invoicesData.invoices.length > 0 && (
						<Table
							values={invoicesData.invoices}
							rows={10}
							responsiveLayout="scroll"
							onRowClick={(invoice) => openDetailPopup(invoice)}
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
							<Column
								field="icons"
								header=""
								body={renderIcons}
							/>
						</Table>
					)}
				</FetchedDataLayout>
			</>
		);
};

export default RekeningenLeider;
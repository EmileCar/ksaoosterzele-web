import React, { useEffect, useRef } from 'react';
import Popup from '../../popup/Popup';
import { Chart } from 'chart.js/auto';
import { InvoiceStatistics } from '../../../types/Invoice';
import useFetch from '../../../hooks/useFetch';
import { getInvoiceStatistics } from '../../../services/invoiceService';
import FetchedDataLayout from '../../../layouts/FetchedDataLayout';

const InvoiceStatisticsPopup = ({ onClose } : { onClose: () => void }) => {
    const { pending, data: statistics, error, refetch } = useFetch<InvoiceStatistics>(getInvoiceStatistics);

    const invoicesCountCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const revenueAmountCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const formatMonthYear = (month: number, year: number) => {
        const date = new Date(year, month - 1);
        return new Intl.DateTimeFormat('nl-NL', { month: 'short', year: 'numeric' }).format(date);
    };

    useEffect(() => {
        if (statistics && invoicesCountCanvasRef.current && revenueAmountCanvasRef.current) {
            const labels = statistics.monthlyInvoicesCount.map(m => formatMonthYear(m.month, m.year));
            const invoiceCounts = statistics.monthlyInvoicesCount.map(m => m.count);
            const revenueAmounts = statistics.monthlyRevenueAmount.map(m => m.total);

            new Chart(invoicesCountCanvasRef.current, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Aantal transacties deze maand',
                            data: invoiceCounts,
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                precision: 0,
                                callback: function(value) {
                                    return Number.isInteger(value) ? value : null;
                                },
                            },
                        },
                        x: {
                            grid: {
                                offset: true,
                            },
                        },
                    },
                },
            });

            new Chart(revenueAmountCanvasRef.current, {
                type: 'line',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Balans van de maand (€)',
                            data: revenueAmounts,
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                            fill: true,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                offset: true,
                            },
                        },
                    },
                },
            });
        }
    }, [statistics]);

    return (
        <Popup title="Rekeningen statistieken" onClose={onClose}>
            <p>Hier zijn statistieken te zien van alle transacties.</p>
            <FetchedDataLayout isPending={pending} error={error}>
                {!statistics ? <p className='error'>No statistics found.</p>
                    :
                    <>
                        <div className='invoice-details'>
                            <div className="invoice-detail-row">
                                <span className="invoice-detail-label">Totale algemene balans:</span>
                                <span className="invoice-detail-value">€ {statistics.totalAmountCollected}</span>
                            </div>
                            <div className="invoice-detail-row">
                                <span className="invoice-detail-label">Totaal aantal transacties:</span>
                                <span className="invoice-detail-value">{statistics.totalInvoicesIssued}</span>
                            </div>
                        </div>
                        <div className="chart-containers">
                            <div className="chart-container">
                                <h3 className='invoice-detail-label'>Maandelijks balans</h3>
                                <canvas ref={revenueAmountCanvasRef}></canvas>
                            </div>
                            <div className="chart-container">
                                <h3 className='invoice-detail-label'>Maandelijks aantal transacties</h3>
                                <canvas ref={invoicesCountCanvasRef}></canvas>
                            </div>
                        </div>
                    </>
                }
            </FetchedDataLayout>
        </Popup>
    );
};

export default InvoiceStatisticsPopup;

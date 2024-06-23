import React, { useEffect } from "react";
import PageLayout from "../../../layouts/PageLayout";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import { useNavigate } from "react-router-dom";

const RegisterConfirmation = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem("inschrijvingData");
        if (!data) {
            navigate("/inschrijven");
        }
    }, []);

    return (
        <PageLayout>
            <SectionTitle title="Succesvol ingeschreven" fullWidth>
                <p><strong>Uw inschrijving voor uw kind is succesvol verwerkt!</strong></p>
                <p>U zal een bevestigingsmail ontvangen op het opgegeven emailadres.</p>
                <p>De inschrijving wordt pas volledig voltooid wanneer het <strong>lidgeld (50 euro)</strong> gestort is op de KSA-Rekening <strong>BE22390023172547</strong></p>
            </SectionTitle>
        </PageLayout>
    )
}

export default RegisterConfirmation;
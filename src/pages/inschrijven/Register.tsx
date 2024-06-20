import React from "react";
import "./Register.css";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import PageLayout from "../../layouts/PageLayout";
import { RegistrationProvider } from "../../contexts/RegistrationContext";
import Teaser from "../../components/inschrijven/Teaser";
import InschrijvenForm from "../../components/inschrijven/InschrijvenForm";

const Register = () => {
    return (
        <PageLayout>
            <SectionTitle title="Uw kind inschrijven" fullWidth>
                <p>Wat leuk dat je uw kind wil laten meegenieten van de leuke activiteiten van KSA Oosterzele!</p>
                <p>Bij vragen of andere opmerkingen kan u ons altijd contacteren.</p>
            </SectionTitle>
            <RegistrationProvider>
                <Teaser />
                <InschrijvenForm />
            </RegistrationProvider>
        </PageLayout>
    );
}

export default Register;
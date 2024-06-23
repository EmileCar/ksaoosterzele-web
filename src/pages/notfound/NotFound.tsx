import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../layouts/PageLayout";
import SectionTitle from "../../components/sectionTitle/SectionTitle";

const NotFound = () => {

    return (
        <PageLayout>
            <SectionTitle title="Sappernootjes, deze pagina bestaat niet" fullWidth/>
            <p>De pagina die je probeert te bezoeken bestaat niet of is verplaatst.</p>
        </PageLayout>
    );
}

export default NotFound;
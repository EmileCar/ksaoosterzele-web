import React, { useEffect, useState } from "react";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";

const InschrijvingenAdmin = () => {
    
    return (
        <>
            <div className="admin__top">
                <SectionTitle title="Inschrijvingen beheren">
                    <p>Hier kun je inschrijvingen zien en aanpassen. Verwijderen kan niet, daarvoor moet je Emile contacteren.</p>
                </SectionTitle>
            </div>
            {/* <InschrijvingenListAdmin/> */}
        </>
    );
}

export default InschrijvingenAdmin;
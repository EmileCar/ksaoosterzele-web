import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import { useAccountContext } from "../../../contexts/AccountContext";
import { logout } from "../../../services/accountService";
import Button from "../../../components/button/Button";

const DashboardAdmin = () => {
    const { account } = useAccountContext();

    const handleClickLogout = async () => {
        await logout();
        window.location.reload();
    }

    return (
        <>
            <SectionTitle title="Welkom op de admin-pagina" fullWidth>
                <p>Vanuit hier kan je de activiteiten, media, inschrijvingen en mattentaarten beheren.</p>
                <p>Je bent ingelogd als {account && account.username} met {account && account.role.name} als rol.</p>
            </SectionTitle>
            <div className="dashboard-grid">
                <Link className="dashboard-card" to="/admin/evenementen">
                    <i className="pi pi-calendar" style={{ color: "white", fontSize: 50 }} />
                    <h3>Evenementen</h3>
                </Link>
                <Link className="dashboard-card" to="/admin/media">
                    <i className="pi pi-images" style={{ color: "white", fontSize: 50 }} />
                    <h3>Media</h3>
                </Link>
                <Link className="dashboard-card" to="/admin/inschrijvingen">
                    <i className="pi pi-users" style={{ color: "white", fontSize: 50 }} />
                    <h3>Inschrijvingen</h3>
                </Link>
                <Link className="dashboard-card" to="/admin/mattentaarten">
                    <i className="pi pi-calendar" style={{ color: "white", fontSize: 50 }} />
                    <h3>Mattentaarten</h3>
                </Link>
            </div>
        </>
    );
}

export default DashboardAdmin;
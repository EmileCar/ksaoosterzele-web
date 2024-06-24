import React from "react";
import { useAccountContext } from "../../../contexts/AccountContext";
import { Link } from "react-router-dom";

const AdminDrawerContent = () => {
    const { account, isPending } = useAccountContext();

    return (
        <>
            <h2>Welkom op de adminpagina</h2>
            {(account !== null) && !isPending ? (
                <>
                    <p>Welkom {account.username}</p>
                    <div className="admin-drawer-links">
                        <Link className="admin-drawer-link" to="/admin">
                            <i className="pi pi-th-large" style={{ color: "primary", fontSize: 30 }} />
                            <h3>Dashboard</h3>
                        </Link>
                        <Link className="admin-drawer-link" to="/admin/evenementen">
                            <i className="pi pi-calendar" style={{ color: "primary", fontSize: 30 }} />
                            <h3>Evenementen</h3>
                        </Link>
                        <Link className="admin-drawer-link" to="/admin/media">
                            <i className="pi pi-images" style={{ color: "primary", fontSize: 30 }} />
                            <h3>Media</h3>
                        </Link>
                        <Link className="admin-drawer-link" to="/admin/inschrijvingen">
                            <i className="pi pi-users" style={{ color: "primary", fontSize: 30 }} />
                            <h3>Inschrijvingen</h3>
                        </Link>
                        <Link className="admin-drawer-link" to="/admin/mattentaarten">
                            <h3>Mattentaarten</h3>
                        </Link>
                    </div>
                </>
            ) : (
                <p>Je bent niet ingelogd</p>
            )}
        </>
    );
}

export default AdminDrawerContent;
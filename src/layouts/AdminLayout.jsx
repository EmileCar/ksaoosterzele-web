import React from "react";
import '../pages/admin/Admin.css';
import Header from "../components/header/Header";
import { ToastProvider } from "../contexts/ToastContext";
import { PopupProvider } from "../contexts/PopupContext";
import Drawer from "../components/drawer/Drawer";
import { useAccountContext } from "../contexts/AccountContext";
import AdminDrawerContent from "../components/drawer/drawercontent/AdminDrawerContent";

const AdminLayout = ({ children }) => {
    const { account, isPending } = useAccountContext();

    return (
        <ToastProvider>
            <Header adminMode={true} />
                <div className="adminLayoutWrapper">
                    <Drawer isOpenFromLoad={(account !== null) && !isPending}>
                        <AdminDrawerContent />
                    </Drawer>
                    <main className="container container-admin">
                        {children}
                    </main>
                </div>
        </ToastProvider>
    );
}

export default AdminLayout;
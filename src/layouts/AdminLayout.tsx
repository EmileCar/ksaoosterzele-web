import React from "react";
import '../pages/admin/Admin.css';
import Header from "../components/header/Header";
import { useAccountContext } from "../contexts/AccountContext";
import Drawer from "../components/drawer/Drawer";
import AdminDrawerContent from "../components/drawer/drawercontent/AdminDrawerContent";
import { GlobalErrorProvider } from "../contexts/GlobalErrorContext";

const AdminLayout = ({ children } : { children: React.ReactNode }) => {
    const { account, isPending } = useAccountContext();

    return (
        <>
            <Header adminMode={true} />
            <div className="adminLayoutWrapper">
                <Drawer isOpenFromLoad={(account !== null) && !isPending}>
                    <AdminDrawerContent />
                </Drawer>
                <main className="container container-admin">
                    <GlobalErrorProvider>
                        {children}
                    </GlobalErrorProvider>
                </main>
            </div>
        </>

    );
}

export default AdminLayout;
import React from "react";
import '../pages/admin/Admin.css';
import Header from "../components/header/Header";
import { useAccountContext } from "../contexts/AccountContext";
import Drawer from "../components/drawer/Drawer";
import AdminDrawerContent from "../components/drawer/drawercontent/AdminDrawerContent";

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
                    {children}
                </main>
            </div>
        </>

    );
}

export default AdminLayout;
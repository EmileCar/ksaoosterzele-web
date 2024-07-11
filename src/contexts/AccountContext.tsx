import React, { createContext, useContext, useEffect, useState } from 'react';
import Account from '../types/Account';
import { getAccount } from '../services/accountService';
import AdminLayout from '../layouts/AdminLayout';
import FetchedDataLayout from '../layouts/FetchedDataLayout';
import Login from '../pages/admin/login/Login';

interface AccountContextType {
    account: Account | null;
    isPending: boolean;
    setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
    globalError: any;
    setGlobalError: React.Dispatch<React.SetStateAction<any>>;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider = ({ children } : { children: React.ReactNode }) => {
    const [isPending, setIsPending] = useState(true);
    const [globalError, setGlobalError] = useState(null);
    const [account, setAccount] = useState<Account | null>(null);

    useEffect(() => {
        checkIfAdminSession()
    }, []);

    const checkIfAdminSession = async () => {
        await getAccount().then((data: Account | null) => {
            setAccount(data);
        }).catch((error) => {
            setGlobalError(error);
        }).finally(() => {
            setIsPending(false);
        });
    };

    return (
        <AccountContext.Provider value={{ account, isPending, setIsPending, globalError, setGlobalError }}>
            <AdminLayout>
                <FetchedDataLayout isPending={isPending} error={globalError}>
                    {account ? children : <Login />}
                </FetchedDataLayout>
            </AdminLayout>
        </AccountContext.Provider>
    );
};

export const useAccountContext = () => {
    const context = useContext(AccountContext);
    if (!context) {
        throw new Error("useAccountContext must be used within an AccountProvider");
    }
    return context;
};
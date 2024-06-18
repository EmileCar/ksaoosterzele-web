import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    
    return (
        <>
            <Header />
                <main className="container">
                    {children}
                </main>
            <Footer />
        </>
    );
}

export default DefaultLayout;
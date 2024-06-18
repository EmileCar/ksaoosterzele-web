import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Notfound = () => {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/');
        window.location.reload();
    }, []);

    return (
        <>
            <div className="page__container">
                <section className="page__section">
                    <h1>404</h1>
                    <p>De pagina {location.pathname} bestaat niet</p>
                    <p>Navigeer naar www.ksaoosterzele.be</p>
                </section>
            </div>
        </>
    );
}

export default Notfound;
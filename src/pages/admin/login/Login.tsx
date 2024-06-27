import React, { useEffect } from "react";
import { useState } from "react";
import { validateCredentials } from "../../../services/accountService";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/Input";
import Form from "../../../components/form/Form";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        validateCredentials(username, password).then(() => {
            window.location.reload();
        }).catch((error) => {
            setError(error.message);
            alert(error.message);
        });;
    }

    useEffect(() => {
        setError("");
    }, [username, password]);

    return (
        <>
            <SectionTitle title="Log in als admin">
                <p style={{marginBottom: "1.5rem"}}>Log in als admin om aanpassingen te doen</p>
            </SectionTitle>
            {error && <p className="error" style={{marginBottom: "1.5rem"}}>{error}</p>}
            <Form customClassName="loginForm">
                <Label text="Gebruikersnaam">
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="Gebruikersnaam" />
                </Label>
                <Label text="Wachtwoord">
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password"  name="password" placeholder="Wachtwoord" />
                </Label>

                <input type="submit" onClick={handleSubmit} value="Log in" className="button submit-button inherit-font"/>
            </Form>
        </>
    );
}

export default Login;
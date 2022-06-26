import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { config } from "../../../../static/constants";
import axios from "axios";
import FinanceImage from "../../../../static/images/finance.png";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Company from "../../../Common/Company";
import styles from "./styles.module.css";

const Register = () => {
    const history = useHistory();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [credentialError, setCredentialError] = useState("");
    const [emailAddress, setEmailAddress] = useState("");

    const checkCredentials = () => {
        if (!userName || !userName.trim()) {
            setCredentialError("Please enter valid user name!");
            return true;
        } else if (!password || !password.trim() || !repeatPassword || !repeatPassword.trim() || password !== repeatPassword) {
            setCredentialError("Please check the password!");
            return true;
        } else {
            return false;
        }
    };

    const registerUser = (event) => {
        event.preventDefault();
        if (checkCredentials()) return;
        axios({
            method: "POST",
            url: `${config}/api/users/register`,
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                username: userName,
                email: emailAddress,
                password: password,
                repeat_password: repeatPassword,
            },
        })
            .then(() => {
                history.push("/login");
            })
            .catch((error) => {
                setCredentialError("");
                setRegisterError(error.message || "Something went wrong!");
            });
    };

    return (
        <section className={["d-flex justify-content-around align-items-center", styles.container].join(" ")}>
            <img src={FinanceImage} className={styles.financeImage} />
            <div className={["d-flex flex-column justify-content-center", styles.registrationForm].join(" ")}>
                <h4 className={styles.productLogo}>ExpenseTracker</h4>
                <form className={["d-flex flex-column", styles.registerForm].join(" ")}>
                    <Input
                        type="text"
                        name="username"
                        icon="fas fa-user"
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                        placeholder="username"
                    />
                    <Input
                        type="email"
                        name="email"
                        icon="fas fa-envelope"
                        value={emailAddress}
                        onChange={(event) => setEmailAddress(event.target.value)}
                        placeholder="email"
                    />
                    <Input
                        type="password"
                        name="password"
                        icon="fas fa-lock"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="password"
                    />
                    <Input
                        type="password"
                        name="repeatPassword"
                        icon="fas fa-lock"
                        value={repeatPassword}
                        onChange={(event) => setRepeatPassword(event.target.value)}
                        placeholder="repeat password"
                    />
                    {registerError && registerError.trim() && <div className={styles.errorText}>{registerError}</div>}
                    {credentialError && credentialError.trim() && <div className={styles.errorText}>{credentialError}</div>}
                </form>
                <div className="d-flex justify-content-between">
                    <Company />
                    <div className="d-flex justify-content-end align-items-center">
                        <Button name="register" onClick={registerUser} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;

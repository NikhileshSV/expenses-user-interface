import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { config } from "../../../../static/constants";
import axios from "axios";
import Background from "../../../../static/images/background.jpg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Company from "../../../Common/Company";
import styles from "./styles.module.css";

const Login = () => {
    const history = useHistory();
    const [userName, setUserName] = useState("");
    const [credentialError, setCredentialError] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const checkCredentials = () => {
        if (!userName || !userName.trim() || userName.length > 120) {
            setCredentialError("Please enter the user name");
            return true;
        } else if (!password || !password.trim()) {
            setCredentialError("Please enter the password");
            return true;
        } else {
            return false;
        }
    };

    const login = (event) => {
        event.preventDefault();
        if (checkCredentials()) return;
        axios({
            method: "POST",
            url: `${config}/api/users/login`,
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                username: userName,
                password: password,
            },
        })
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("isLoggedin", true);
                history.push("/transactions");
            })
            .catch((error) => {
                setCredentialError(false);
                setLoginError(error.message || "Something went wrong!");
            });
    };

    const changeUserName = (event) => {
        const username = event.target.value;
        setUserName(username);
    };

    const changePassword = (event) => {
        const password = event.target.value;
        setPassword(password);
    };

    return (
        <section className={["d-flex justify-content-around align-items-center", styles.container].join(" ")}>
            <div className={["d-flex", styles.loginContent].join(" ")}>
                {loginError === true && <div className="error bg-danger">{loginError}</div>}
                <form className={styles.login}>
                    <h4 className={styles.productLogo}>ExpenseTracker</h4>
                    <Input
                        type="text"
                        name="username"
                        icon="fas fa-user"
                        placeholder="username"
                        value={userName}
                        onChange={(event) => changeUserName(event)}
                    />
                    <Input
                        type="password"
                        name="password"
                        icon="fas fa-lock"
                        placeholder="password"
                        value={password}
                        onChange={(event) => changePassword(event)}
                    />
                    <div className="d-flex justify-content-end">
                        <Button name="login" onClick={login} />
                    </div>
                    {credentialError === true && <div className={styles.errorText}>Please enter valid credentials!</div>}
                    {loginError && loginError.trim() && <div className={styles.errorText}>{loginError}</div>}
                    <div className="d-flex justify-content-between mt-5">
                        <Company />
                        <div className={["d-flex justify-content-start align-items-center", styles.newUser].join(" ")}>
                            <span>new user ?</span>
                            <a className={["ml-1", styles.register].join(" ")} href="/register">
                                register
                            </a>
                        </div>
                    </div>
                </form>
                <div className={styles.expensesContainer}>
                    <img src={Background} className={styles.expensesImage} alt="background-image" />
                </div>
            </div>
        </section>
    );
};

export default Login;

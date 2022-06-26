import React from "react";
import { useHistory, NavLink } from "react-router-dom";
import styles from "./styles.module.css";

const Navbar = () => {
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedin");
        history.push("/login");
    };

    return (
        <nav className={["navbar navbar-expand-lg navbar-light bg-light", styles.navbar].join(" ")}>
            <a className={["navbar-brand", styles.navbarBrand].join(" ")} href="/">
                ExpenseTracker
            </a>
            <button
                className={["navbar-toggler", styles.navbarToggler].join(" ")}
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={["collapse navbar-collapse justify-content-end", styles.navbarItems].join(" ")} id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className={["nav-item", styles.navItem].join(" ")}>
                        <NavLink to="/transactions" activeClassName={styles.activeLink} className="nav-link">
                            Transactions
                        </NavLink>
                    </li>
                    <li className={["nav-item", styles.navItem].join(" ")}>
                        <NavLink to="/reports" exact activeClassName={styles.activeLink} className="nav-link">
                            Reports
                        </NavLink>
                    </li>
                    <li className={["nav-item dropdown", styles.navItem, styles.profile].join(" ")}>
                        <i
                            className={["fas fa-user-circle dropdown-toggle", styles.dropdownToggle].join(" ")}
                            data-toggle="dropdown"
                            aria-expanded="false"
                        />
                        <ul className={["dropdown-menu dropdown-menu-right", styles.dropdownMenu].join(" ")}>
                            <li className="dropdown-item" onClick={logout}>
                                Logout
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

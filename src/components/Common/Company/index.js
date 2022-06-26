import React from "react";
import CompanyLogo from "../../../static/images/logo.png";
import styles from "./styles.module.css";

const Company = () => {
    return (
        <div className={["d-flex align-items-center", styles.poweredBy].join(" ")}>
            <img src={CompanyLogo} className={styles.companyLogo} alt="companyLogo" />
            <div className={styles.companyName}>
                made by
                <div className={styles.name}>Nikkhilesh S V</div>
            </div>
        </div>
    );
};

export default Company;

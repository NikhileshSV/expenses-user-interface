import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const Button = ({ name, onClick }) => {
    return (
        <button className={styles.loginSubmit} onClick={onClick}>
            <span className={["text-capitalize", styles.buttonText].join(" ")}>{name}</span>
        </button>
    );
};

Button.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Button;

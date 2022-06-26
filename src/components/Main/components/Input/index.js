import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const Input = ({ type, name, placeholder }) => {
    return (
        <div className={styles.inputField}>
            <input type={type} className={styles.input} name={name} placeholder={placeholder} />
        </div>
    );
};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
};

export default Input;

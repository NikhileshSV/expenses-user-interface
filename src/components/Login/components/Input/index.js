import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const Input = ({ icon, type, name, placeholder, value, onChange }) => {
    return (
        <div className={styles.loginField}>
            {icon && icon.trim() && <i className={[styles.loginIcon, icon].join(" ")}></i>}
            <input type={type} className={styles.loginInput} name={name} value={value} onChange={onChange} placeholder={placeholder} />
        </div>
    );
};

Input.propTypes = {
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Input;

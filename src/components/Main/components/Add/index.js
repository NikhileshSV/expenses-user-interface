import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const Add = ({ setToggleModal }) => {
    return <div className={["p-2 text-uppercase text-right", styles.addExpenditure].join(" ")} onClick={setToggleModal}></div>;
};

Add.propTypes = {
    setToggleModal: PropTypes.func.isRequired,
};

export default Add;

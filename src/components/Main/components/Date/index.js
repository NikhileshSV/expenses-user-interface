import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./styles.module.css";

const Date = ({ selectedDate, setSelectedDate }) => {
    return (
        <div className={styles.dateSelector}>
            <DatePicker popperPlacement="bottom-start" selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
        </div>
    );
};

Date.propTypes = {
    selectedDate: PropTypes.object.isRequired,
    setSelectedDate: PropTypes.func,
};

export default Date;

import React from "react";
import PropTypes from "prop-types";
import Moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./styles.module.css";

const Filter = ({ startDate, setStartDate, endDate, setEndDate }) => {
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start ? start : null);
        setEndDate(end ? end : null);
    };

    return (
        <>
            <DatePicker selected={startDate} onChange={onChange} startDate={startDate} endDate={endDate} maxDate={new Date()} selectsRange />
            <div className={["row mt-3", styles.filterHeading].join(" ")}>
                <h6 className="col-md-10 col-sm-12">
                    Showing reports from({Moment(startDate).format("ll")} - {Moment(endDate).format("ll")})
                </h6>
            </div>
        </>
    );
};

Filter.propTypes = {
    startDate: PropTypes.object.isRequired,
    setStartDate: PropTypes.func.isRequired,
    endDate: PropTypes.object.isRequired,
    setEndDate: PropTypes.func.isRequired,
};

export default Filter;

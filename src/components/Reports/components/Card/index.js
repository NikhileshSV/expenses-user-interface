import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const Card = ({ name, showCurrency, value }) => {
    return (
        <div className="col-md-6 col-sm-12">
            <div className={["p-3", styles.card].join(" ")}>
                <h6 className="text-capitalize">{name}</h6>
                <p className="text-center">
                    {showCurrency ? <>&#8377;</> : ""}
                    {value}
                </p>
            </div>
        </div>
    );
};

Card.propTypes = {
    name: PropTypes.string,
    showCurrency: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Card;

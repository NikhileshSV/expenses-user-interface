import React from "react";
import PropTypes from "prop-types";
import Card from "../Card";

const Stats = ({ totalMonthAmount, totalWeekAmount, mostSpentItem, mostSpentCategory, debtAmount, investmentAmount }) => {
    return (
        <div className="col-md-6 col-sm-12">
            <div className="row">
                <Card name="total amount spent" showCurrency={true} value={totalMonthAmount} />
                <Card name="amount spent this week" showCurrency={true} value={totalWeekAmount} />
            </div>
            <div className="row mt-3">
                <Card name="most spent item" showCurrency={false} value={mostSpentItem} />
                <Card name="most spent category" showCurrency={false} value={mostSpentCategory} />
            </div>
            <div className="row mt-3">
                <Card name="debt" showCurrency={true} value={debtAmount} />
                <Card name="investments" showCurrency={true} value={investmentAmount} />
            </div>
        </div>
    );
};

Stats.propTypes = {
    totalMonthAmount: PropTypes.number.isRequired,
    totalWeekAmount: PropTypes.number.isRequired,
    mostSpentItem: PropTypes.string.isRequired,
    mostSpentCategory: PropTypes.string.isRequired,
    debtAmount: PropTypes.number.isRequired,
    investmentAmount: PropTypes.number.isRequired,
};

export default Stats;

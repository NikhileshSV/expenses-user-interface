import React from "react";
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
import styles from "./styles.module.css";

const PieChart = ({ expenditures }) => {
    let categoryList = [];
    expenditures.forEach((expenditure) => {
        if (!categoryList.includes(expenditure.category)) {
            categoryList.push(expenditure.category);
        }
    });

    const options = {
        chart: {
            width: 400,
            height: 400,
            type: "pie",
        },
        labels: categoryList,
    };

    const categoryScores = categoryList.map((category) => {
        const scoreList = expenditures.filter((expenditure) => expenditure.category === category).map((expenditure) => expenditure.price);
        const scores = scoreList.reduce((prev, next) => parseFloat(prev) + parseFloat(next), 0);
        return scores;
    });

    const series = categoryScores;

    return (
        <div className={["d-flex justify-content-center mt-4", styles.chartContainer].join(" ")}>
            <ReactApexChart options={options} series={series} type="pie" width={380} />
        </div>
    );
};

PieChart.propTypes = {
    expenditures: PropTypes.array.isRequired,
};

export default PieChart;

import React from "react";
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
import styles from "./styles.module.css";

const PieChart = ({ categoryList, categoryScores }) => {
    let options = {
        chart: {
            width: 400,
            height: 400,
            type: "pie",
        },
        labels: categoryList,
    };

    if (window.innerWidth <= 671) {
        options = {
            ...options,
            chart: {
                ...options.chart,
                offsetX: -40,
            },
            legend: {
                show: false,
            },
        };
    }

    const series = categoryScores.map((item) => Object.values(item)[0]);

    return (
        <div className="col-md-6 col-sm-12">
            <div className={["d-flex flex-column p-3", styles.shadow, styles.chartContainer].join(" ")}>
                <h6 className="text-capitalize">expenditure pie</h6>
                <ReactApexChart options={options} series={series} type="pie" width={380} />
            </div>
        </div>
    );
};

PieChart.propTypes = {
    categoryList: PropTypes.array.isRequired,
    categoryScores: PropTypes.array.isRequired,
};

export default PieChart;

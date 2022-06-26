import React from "react";
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
import styles from "./styles.module.css";

const LineGraph = ({ categoryList }) => {
    const series = categoryList.map((item) => Object.values(item)[0]);
    const types = categoryList.map((item) => Object.keys(item)[0]);

    const options = {
        xaxis: {
            categories: types,
        },
        chart: {
            height: 350,
            type: "line",
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "straight",
        },
        grid: {
            row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5,
            },
        },
    };

    const seriesList = [
        {
            name: "amount spent",
            data: series,
        },
    ];

    return (
        <div className={["d-flex flex-column p-3 mt-3", styles.shadow, styles.chartContainer].join(" ")}>
            <h6 className="text-capitalize">monthly expenditure graph</h6>
            <ReactApexChart options={options} series={seriesList} height={400} />
        </div>
    );
};

LineGraph.propTypes = {
    categoryList: PropTypes.array.isRequired,
};

export default LineGraph;

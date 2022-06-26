import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const Table = ({ tableHeader, tableList }) => {
    return (
        <div className="table-responsiveness mt-3">
            <table className={["table", styles.shadow].join(" ")}>
                <thead>
                    <tr>
                        {tableHeader.map((heading, index) => {
                            return (
                                <th scope="col" className={["text-capitalize", styles.tableHeading].join(" ")} key={index}>
                                    {heading}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tableList.map((item, index) => {
                        return (
                            <tr key={index} className={styles.tableData}>
                                <td className="text-uppercase">{Object.keys(item)[0]}</td>
                                <td>{Object.values(item)[0]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

Table.propTypes = {
    tableHeader: PropTypes.array.isRequired,
    tableList: PropTypes.array.isRequired,
};

export default Table;

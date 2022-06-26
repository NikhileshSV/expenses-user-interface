import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import styles from "./styles.module.css";
import { config } from "../../../../static/constants";

const List = ({ expenditures, setExpenditures, setToggleModal, setSelectedExpenditure, setErrorNotification }) => {
    const [totalSpentAmount, setTotalSpentAmount] = useState(0);

    useEffect(() => {
        const totalAmount =
            expenditures &&
            expenditures.length > 0 &&
            expenditures.reduce((accumulator, element) => {
                return accumulator + parseFloat(element.price);
            }, 0);
        setTotalSpentAmount(totalAmount);
    }, [expenditures]);

    const editExpense = (expenditure) => {
        setSelectedExpenditure(expenditure);
        setToggleModal(true);
    };

    const deleteExpense = (expenditureId) => {
        axios({
            method: "DELETE",
            url: `${config}/api/transactions`,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
            params: {
                token: localStorage.getItem("token"),
            },
            data: {
                id: expenditureId,
            },
        })
            .then(() => {
                let expenses = expenditures.filter((expense) => expense.id !== expenditureId);
                setExpenditures(expenses);
                setToggleModal(false);
            })
            .catch(() => {
                setErrorNotification("Unable to delete the transacation. Please try again later");
            });
    };

    return (
        <ul className={["mt-2", styles.expenseList].join(" ")}>
            {expenditures.length > 0 ? (
                <>
                    {expenditures.map((expenditure) => {
                        return (
                            <li key={uuid()} className={["d-flex align-items-center p-2 mt-2", styles.expenseItem].join(" ")}>
                                <div className={styles.productName}>{expenditure.productName}</div>
                                <div className={["ml-2", styles.price].join(" ")}>&#8377;{expenditure.price}</div>
                                <div className={["d-flex justify-content-around", styles.controls].join(" ")}>
                                    <div onClick={() => editExpense(expenditure)}>
                                        <i className={["fas fa-pen", styles.controlIcon].join(" ")}></i>
                                    </div>
                                    <div onClick={() => deleteExpense(expenditure.id)}>
                                        <i className={["fas fa-trash", styles.controlIcon].join(" ")}></i>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                    <li className={["d-flex align-items-center p-2 mt-2", styles.expenseItem].join(" ")}>
                        <div className={styles.productName}>total</div>
                        <div className={["ml-2", styles.price].join(" ")}>&#8377;{totalSpentAmount}</div>
                    </li>
                </>
            ) : null}
        </ul>
    );
};

List.propTypes = {
    expenditures: PropTypes.array.isRequired,
    setExpenditures: PropTypes.func.isRequired,
    setToggleModal: PropTypes.func.isRequired,
    setSelectedExpenditure: PropTypes.func.isRequired,
    setErrorNotification: PropTypes.func.isRequired,
};

export default List;

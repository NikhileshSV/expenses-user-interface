import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Dropdown from "../Dropdown";
import styles from "./styles.module.css";
import { config } from "../../../../static/constants";

const Popup = ({ setToggleModal, expenditures, setExpenditures, selectedExpenditure, selectedDate }) => {
    const expenseTypes = [
        {
            name: "necessity",
            category: "necessity",
        },
        {
            name: "liesure",
            category: "liesure",
        },
        {
            name: "investments",
            category: "investments",
        },
        {
            name: "loans",
            category: "loans",
        },
        {
            name: "insurance",
            category: "insurance",
        },
    ];

    const paymentTypes = [
        {
            name: "cash",
            category: "cash",
        },
        {
            name: "debit card",
            category: "debit_card",
        },
        {
            name: "upi",
            category: "upi",
        },
        {
            name: "credit card",
            category: "credit_card",
        },
        {
            name: "net banking",
            category: "net_banking",
        },
    ];

    const [expenditureName, setExpenditureName] = useState("");
    const [expenditurePrice, setExpenditurePrice] = useState("");
    const [expenditureType, setExpenditureType] = useState(expenseTypes[0]);
    const [paymentMode, setPaymentMode] = useState(paymentTypes[0]);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (selectedExpenditure.id) {
            setExpenditureName(selectedExpenditure.productName);
            setExpenditurePrice(selectedExpenditure.price);
            setExpenditureType(expenseTypes.find((expense) => expense.category === selectedExpenditure.category));
            setPaymentMode(paymentTypes.find((payment) => payment.category === selectedExpenditure.paymentMode));
        }
    }, [selectedExpenditure]);

    const saveExpense = () => {
        if (!expenditureName || !expenditureName.trim() || !expenditurePrice || isNaN(expenditurePrice) || !expenditureType || !paymentMode) {
            return;
        }
        let data = {
            productName: expenditureName,
            price: parseFloat(expenditurePrice),
            category: expenditureType.category,
            paymentMode: paymentMode.category,
        };
        if (selectedExpenditure.id) {
            data = { ...data, id: selectedExpenditure.id };
        } else {
            data = { ...data, createdAt: selectedDate };
        }
        axios({
            method: selectedExpenditure.id ? "PUT" : "POST",
            url: `${config}/api/transactions`,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
            params: {
                token: localStorage.getItem("token"),
            },
            data: data,
        })
            .then((response) => {
                setError(false);
                const expense = {
                    id: response.data.id || selectedExpenditure.id,
                    productName: expenditureName,
                    price: parseFloat(expenditurePrice),
                    category: expenditureType.category,
                    paymentMode: paymentMode.category,
                };
                let expenses = [];
                if (selectedExpenditure.id) {
                    expenses = expenditures.map((expenditure) => {
                        if (expenditure.id === expense.id) {
                            return expense;
                        }
                        return expenditure;
                    });
                } else {
                    expenses = [...expenditures, expense];
                }
                setExpenditures(expenses);
                setToggleModal(false);
            })
            .catch(() => {
                setError(true);
            });
    };

    return (
        <div className={["modal d-block", styles.modal].join(" ")} tabIndex="-1">
            <div className={["modal-dialog position-relative", styles.modalDialog].join(" ")}>
                <div className={["modal-content p-2", styles.modalContent].join(" ")}>
                    <div className="d-flex flex-row align-items-center">
                        <input
                            type="text"
                            className="form-control"
                            value={expenditureName}
                            onChange={(event) => setExpenditureName(event.target.value)}
                            placeholder="product name"
                        />
                        <input
                            type="number"
                            className="form-control ml-2"
                            value={expenditurePrice}
                            onChange={(event) => setExpenditurePrice(event.target.value)}
                            placeholder="price"
                        />
                    </div>
                    <div className="row mt-2">
                        <Dropdown
                            dropdownList={expenseTypes}
                            className={["col-md-4 col-sm-12", styles.expenseSelection].join(" ")}
                            dropdownName="category"
                            value={expenditureType}
                            setChangeContent={setExpenditureType}
                        />
                        <Dropdown
                            dropdownList={paymentTypes}
                            className={["col-md-4 col-sm-12", styles.expenseSelection].join(" ")}
                            dropdownName="payment_mode"
                            value={paymentMode}
                            setChangeContent={setPaymentMode}
                        />
                        <div className={["col-md-4 col-sm-12 d-flex justify-content-between", styles.expenseSelection].join(" ")}>
                            <div className={["btn btn-primary", styles.saveExpense].join(" ")} onClick={saveExpense}>
                                save
                            </div>
                            <div className={["btn btn-secondary", styles.closeModal].join(" ")} onClick={() => setToggleModal(false)}>
                                close
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Popup.propTypes = {
    setToggleModal: PropTypes.func.isRequired,
    expenditures: PropTypes.array.isRequired,
    setExpenditures: PropTypes.func.isRequired,
    selectedExpenditure: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired,
};

export default Popup;

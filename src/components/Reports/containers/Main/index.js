import React, { useEffect, useState } from "react";
import Moment from "moment";
import axios from "axios";
import Navbar from "../../../Common/Navbar";
import PieChart from "../../components/PieChart";
import Filter from "../../components/Filter";
import Stats from "../../components/Stats";
import Table from "../../components/Table";
import LineGraph from "../../components/LineGraph";
import Loading from "../../../Common/Loading";
import styles from "./styles.module.css";
import { config } from "../../../../static/constants";

const expenseTypes = ["necessity", "liesure", "investments", "loans", "insurance"];
const paymentTypes = ["cash", "debit_card", "upi", "credit_card", "net_banking"];
const categoryHeading = ["category name", "amount spent(in ₹)"];
const paymentHeading = ["payment mode", "amount spent(in ₹)"];

const Main = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [weeklyExpenditure, setWeeklyExpenditure] = useState([]);
    const [totalMonthAmount, setTotalMonthAmount] = useState(0);
    const [totalWeekAmount, setWeekAmount] = useState(0);
    const [mostSpentItem, setMostSpentItem] = useState("");
    const [mostSpentCategory, setMostSpentCategory] = useState("");
    const [debtAmount, setDebtAmount] = useState(0);
    const [investmentAmount, setInvestmentAmount] = useState(0);
    const [categoryAmountList, setCategoryAmountList] = useState([]);
    const [paymentAmountList, setPaymentAmountList] = useState([]);
    const [isDataAvailable, setIsDataAvailable] = useState(false);
    const [startDate, setStartDate] = useState(Moment().startOf("month")._d);
    const [endDate, setEndDate] = useState(Moment()._d);

    useEffect(() => {
        if (startDate && endDate) {
            getReports();
        }
    }, [startDate, endDate]);

    const getReports = () => {
        const data = {
            method: "post",
            url: `${config}/api/reports/`,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
            params: {
                token: localStorage.getItem("token"),
            },
            data: {
                startDate,
                endDate,
            },
        };
        axios(data)
            .then((response) => {
                setError(false);
                const transactions = response.data.transactions;
                setLoading(false);
                if (transactions && transactions.length > 0) {
                    setIsDataAvailable(true);
                } else {
                    return;
                }
                const monthlyExpeniture = transactions.reduce((accumulator, object) => {
                    return accumulator + parseFloat(object.price);
                }, 0);
                setTotalMonthAmount(monthlyExpeniture);
                const weeklyExpediture = transactions
                    .filter((element) => Moment(element.createdAt).isSame(new Date(), "week"))
                    .reduce((accumulator, object) => {
                        return accumulator + parseFloat(object.price);
                    }, 0);
                setWeekAmount(weeklyExpediture);
                const highestSpentItem = transactions.reduce((acc, elem) => {
                    if (!acc.price || (acc && parseFloat(acc.price) < parseFloat(elem.price))) {
                        acc = elem;
                    }
                    return acc;
                }, {});
                setMostSpentItem(highestSpentItem.productName);
                let categorySpent = {};
                let categoriesList = [];
                expenseTypes.forEach((category) => {
                    const price = transactions
                        .filter((expenditure) => expenditure.category === category)
                        .reduce((accumulator, next) => accumulator + parseFloat(next.price), 0);
                    categorySpent = { ...categorySpent, [category]: price };
                    categoriesList = [...categoriesList, { [category]: price }];
                });
                setCategoryAmountList(categoriesList);
                const highestSpentCategory = Object.keys(categorySpent).reduce((a, b) => (categorySpent[a] > categorySpent[b] ? a : b));
                setMostSpentCategory(highestSpentCategory);
                const debt = categorySpent.loans ? categorySpent.loans : 0;
                setDebtAmount(debt);
                const investment = categorySpent.investments ? categorySpent.investments : 0;
                setInvestmentAmount(investment);
                categoriesList = [];
                paymentTypes.forEach((category) => {
                    const price = transactions
                        .filter((expenditure) => expenditure.paymentMode === category)
                        .reduce((accumulator, next) => accumulator + parseFloat(next.price), 0);
                    categoriesList = [...categoriesList, { [category]: price }];
                });
                setPaymentAmountList(categoriesList);
                categoriesList = [];
                let currentMonthDates = Array.from({ length: Moment.duration(Moment(endDate).diff(Moment(startDate))).asDays() }, (_, i) =>
                    Moment(startDate).startOf("day").add(i, "days")
                );
                if (currentMonthDates.length > 31) {
                    currentMonthDates = Array.from({ length: Moment.duration(Moment(endDate).diff(Moment(startDate))).asWeeks() }, (_, i) =>
                        Moment(startDate).startOf("week").add(i, "weeks")
                    );
                    if (currentMonthDates.length > 10) {
                        currentMonthDates = Array.from(
                            { length: Moment.duration(Moment(endDate).endOf("month").diff(Moment(startDate).startOf("month"))).asMonths() },
                            (_, i) => Moment(startDate).startOf("month").add(i, "months")
                        );
                        if (currentMonthDates.length > 12) {
                            currentMonthDates = Array.from(
                                { length: Moment.duration(Moment(endDate).endOf("year").diff(Moment(startDate).startOf("year"))).asYears() },
                                (_, i) => Moment(startDate).startOf("year").add(i, "years")
                            );
                            currentMonthDates.forEach((date) => {
                                const price = transactions
                                    .filter(
                                        (expenditure) =>
                                            Moment(expenditure.createdAt).isAfter(date) &&
                                            Moment(expenditure.createdAt).isBefore(Moment(date).endOf("year"))
                                    )
                                    .reduce((accumulator, next) => accumulator + parseFloat(next.price), 0);
                                categoriesList = [...categoriesList, { [`${date.format("YYYY")}`]: price }];
                            });
                        } else {
                            currentMonthDates.forEach((date) => {
                                const price = transactions
                                    .filter(
                                        (expenditure) =>
                                            Moment(expenditure.createdAt).isAfter(date) &&
                                            Moment(expenditure.createdAt).isBefore(Moment(date).endOf("month"))
                                    )
                                    .reduce((accumulator, next) => accumulator + parseFloat(next.price), 0);
                                categoriesList = [...categoriesList, { [`${date.format("MMM")}`]: price }];
                            });
                        }
                    } else {
                        currentMonthDates.forEach((date) => {
                            const price = transactions
                                .filter(
                                    (expenditure) =>
                                        Moment(expenditure.createdAt).isAfter(date) &&
                                        Moment(expenditure.createdAt).isBefore(Moment(date).endOf("week"))
                                )
                                .reduce((accumulator, next) => accumulator + parseFloat(next.price), 0);
                            categoriesList = [...categoriesList, { [`${date.format("DD-MMM")}`]: price }];
                        });
                    }
                } else {
                    currentMonthDates.forEach((date) => {
                        const price = transactions
                            .filter(
                                (expenditure) =>
                                    Moment(expenditure.createdAt).isAfter(date) && Moment(expenditure.createdAt).isBefore(Moment(date).endOf("day"))
                            )
                            .reduce((accumulator, next) => accumulator + parseFloat(next.price), 0);
                        categoriesList = [...categoriesList, { [`${date.format("DD")}`]: price }];
                    });
                }
                setWeeklyExpenditure(categoriesList);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            });
    };

    return (
        <>
            <Navbar />
            <section className="p-3">
                <Filter startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
                {loading === true && <Loading />}
                {loading === false && isDataAvailable === true && error === false && (
                    <>
                        <div className="mt-3 row">
                            <PieChart categoryList={expenseTypes} categoryScores={categoryAmountList} />
                            <Stats
                                totalMonthAmount={totalMonthAmount}
                                totalWeekAmount={totalWeekAmount}
                                mostSpentItem={mostSpentItem}
                                mostSpentCategory={mostSpentCategory}
                                debtAmount={debtAmount}
                                investmentAmount={investmentAmount}
                            />
                        </div>
                        <LineGraph categoryList={weeklyExpenditure} />
                        <Table tableHeader={categoryHeading} tableList={categoryAmountList} />
                        <Table tableHeader={paymentHeading} tableList={paymentAmountList} />
                    </>
                )}
                {loading === false && isDataAvailable === false && (
                    <div className={styles.noExpenseData}>No expenses available, please add the expense in the transactions</div>
                )}
                {loading === false && error === true && <div>Something went wrong! please try again later.</div>}
            </section>
        </>
    );
};

export default Main;

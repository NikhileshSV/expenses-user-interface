import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import Moment from "moment";
import Add from "../../components/Add";
import List from "../../components/List";
import Date from "../../components/Date";
import Popup from "../../components/Popup";
import PieChart from "../../components/PieChart";
import Loading from "../../../Common/Loading";
import Error from "../../../Common/Error";
import Navbar from "../../../Common/Navbar";
import { config } from "../../../../static/constants";

const Main = () => {
    const [expenditures, setExpenditures] = useState([]);
    const [selectedExpenditure, setSelectedExpenditure] = useState({});
    const [selectedDate, setSelectedDate] = useState(Moment()._d);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);
    const [toggleModal, setToggleModal] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [errorNotification, setErrorNotification] = useState("");

    useEffect(() => {
        setLoading(true);
        setFetchError(false);
        setIsDataLoaded(false);
        getTransactions();
    }, [selectedDate]);

    const getTransactions = () => {
        const data = {
            method: "get",
            url: `${config}/api/transactions/`,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            withCredentials: true,
            params: {
                createdAt: selectedDate,
                token: localStorage.getItem("token"),
            },
        };
        axios(data)
            .then((response) => {
                setLoading(false);
                setIsDataLoaded(true);
                setFetchError(false);
                setExpenditures(response.data.transactions);
            })
            .catch(() => {
                setFetchError(true);
            });
    };

    const addExpenditure = () => {
        setSelectedExpenditure({});
        setToggleModal(true);
    };

    return (
        <>
            <Navbar />
            <div className="p-3">
                {errorNotification && errorNotification.trim() && <Error errorMessage={errorNotification} />}
                <div className="d-flex justify-content-md-end justify-content-sm-center">
                    <Date selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                </div>
                <div className="clearfix"></div>
                {loading === true && <Loading />}
                {loading === false && isDataLoaded === true && expenditures && expenditures.length > 0 && (
                    <>
                        <PieChart expenditures={expenditures} />
                        <List
                            expenditures={expenditures}
                            setExpenditures={setExpenditures}
                            setToggleModal={setToggleModal}
                            setSelectedExpenditure={setSelectedExpenditure}
                            setErrorNotification={setErrorNotification}
                        />
                    </>
                )}
                {loading === false && isDataLoaded === false && fetchError === true && <div>Something went wrong! please try again later.</div>}
                <Add setToggleModal={(value) => addExpenditure(value)} />
                {toggleModal &&
                    ReactDOM.createPortal(
                        <Popup
                            setToggleModal={(value) => setToggleModal(value)}
                            selectedDate={selectedDate}
                            expenditures={expenditures}
                            setExpenditures={setExpenditures}
                            selectedExpenditure={selectedExpenditure}
                        />,
                        document.getElementById("popup-container")
                    )}
            </div>
        </>
    );
};

export default Main;

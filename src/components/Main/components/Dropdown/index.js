import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const Dropdown = ({ dropdownList, value, setChangeContent, className }) => {
    return (
        <div className={className}>
            <div className={["dropdown", styles.dropdown].join(" ")}>
                <div
                    className={["dropdown-toggle d-flex justify-content-between align-items-center", styles.dropdownToggle].join(" ")}
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    {value.name}
                </div>
                <ul className={["dropdown-menu", styles.dropdownMenu].join(" ")} aria-labelledby="dropdownMenuButton">
                    {dropdownList.map((list, index) => {
                        return (
                            <li key={index} className="dropdown-item" onClick={() => setChangeContent(list)}>
                                {list.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

Dropdown.propTypes = {
    dropdownList: PropTypes.array.isRequired,
    value: PropTypes.object.isRequired,
    setChangeContent: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
};

export default Dropdown;

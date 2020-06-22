import React from "react";

import './style.css'


export const Input = ({label, value, onChange}) => {

    return (
        <div className="blockInput">
            <label>{label}</label>
            <input
                className="input"
                value={value}
                onChange={onChange}
            />
        </div>
    )
};

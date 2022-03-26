import React from "react";
import classes from './InputText.module.css'

export default function InptuText({ refInputText, placeholder, value, onChangeInputText }) {

    return (
        <input
        type="text"
        value={value}
        className={classes.input}
        ref={refInputText}
        placeholder={placeholder}
        onChange={onChangeInputText}
        />
    );
}

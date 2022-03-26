import React from "react";
import classes from './IconButton.module.css'

export default function IconButton ({ onClick, children }, ) {

    return (
        <button className={classes.button} onClick={onClick}>{ children }</button>
    )
}
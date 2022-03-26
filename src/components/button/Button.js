import React from 'react'
import classes from './Button.module.css'

export default function Button ({ value, disabled, onClick, type='button' }) {

    return (
        <div className={classes['button-div']}>
            <button className={classes.button} disabled={disabled} onClick={onClick} type={type}>
                { value }
            </button>
        </div>
    )
}
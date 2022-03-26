import React, { useState, useRef } from 'react'
import Button from '../button/Button';
import InptuText from '../inputText/InputText'
import classes from './SignupModal.module.css'

export default function SignupModal ({ onSubmit }) {
    const [onEmptyValue, setOnEmptyValue] = useState(true);
    const refInputText = useRef(null);
    
    const onChangeInputText = e => {
        const value = e.target.value;
        if(value === "") {
            setOnEmptyValue(true);
        }
        else if(setOnEmptyValue) {
            setOnEmptyValue(false);
        }
    }

    const onSubmitHandler = () => {
        const value = refInputText.current.value;
        onSubmit(value);
    }

    return (
        <div className={classes.box  }>
            <h2>Welcome to CodeLeap network!</h2>
            <p>Please enter your username</p>
            <InptuText refInputText={refInputText} placeholder="Username" onChangeInputText={onChangeInputText}/>
            <Button value="ENTER" disabled={onEmptyValue} onClick={onSubmitHandler}/>
        </div>
    )
}
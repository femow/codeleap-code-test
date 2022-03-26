import React, { useRef, useState } from 'react'
import Button from '../button/Button'
import InptuText from '../inputText/InputText'
import classes from './PostForm.module.css'
import { useSelector } from 'react-redux'

export default function PostForm ({ onRefreshPage }) {
    const refInputText = useRef(null);
    const refTextArea = useRef(null);
    const [onButtonDisabled, setOnButtonDisabled] = useState(true);
    const URL_CODELEAP_API = process.env.REACT_APP_CODELEAP_API;
    const username = useSelector(state => state.username);

    const onSubmitHandler = async e => {
        e.preventDefault();
        const valueTitle = refInputText.current.value;
        const valueContent = refTextArea.current.value;
        if(valueTitle === "" || valueContent === "") {
            return;
        }

        const response = await fetch(URL_CODELEAP_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                username: username,
                title: valueTitle,
                content: valueContent
            })
        })
        if(response.ok) {
            onRefreshPage(true);
            refInputText.current.value = "";
            refTextArea.current.value = "";
        }
    }

    const checkOnButtonDisabled = () => {
        const valueInputText = refInputText.current.value;
        const valueTextArea = refTextArea.current.value;
        if(valueInputText === "" || valueTextArea === "") {
            if(!onButtonDisabled) {
                setOnButtonDisabled(true);
            }
        }
        else if(onButtonDisabled) {
            setOnButtonDisabled(false);
        }
    }

    const onChangeInputText = () => {
        checkOnButtonDisabled();
    }
    
    const onChangeTextareaHandler = () => {
        checkOnButtonDisabled();
    }

    return (
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <h3>What's on your mind?</h3>
            <label >Title</label>
            <InptuText placeholder='Hello world' refInputText={refInputText} onChangeInputText={onChangeInputText}/>
            <label>Content</label>
            <textarea placeholder='Content here' ref={refTextArea} onChange={onChangeTextareaHandler}/>
            <Button value="CREATE" disabled={onButtonDisabled} onSubmit={onSubmitHandler} type="submit"/>
        </form>
    )
}
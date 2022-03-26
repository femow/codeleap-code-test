import React from 'react'
import classes from './SignupPage.module.css'
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/authReducer'
import SignupModal from '../../components/signupModal/SignupModal';

export default function SignupPage () {
    const dispatch = useDispatch();

    const onSubmit = value => {
        if(value === "") return;
        dispatch(authActions.login(value))
    }

    return (
        <div className={classes.content} >
            <SignupModal onSubmit={onSubmit}/>
        </div>
    )
}
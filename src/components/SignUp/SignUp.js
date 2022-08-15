import React, { useRef, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import styles from './SignUp.module.scss';
import { required, length, email } from '../../utils/validators';
import AuthContext from '../../auth-context';

const SignUp = () => {
    const context = useContext(AuthContext);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const nameRef = useRef(null);

    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const inputElems = [emailRef, passwordRef, nameRef];
        let isValid = true;
        for (const elem in inputElems) {
            isValid = isValid && required(inputElems[elem].current.value);
        }

        isValid = isValid && length(passwordRef.current.value, { min: 6, max: 25 });
        isValid = isValid && length(nameRef.current.value, { min: 2, max: 20 });
        isValid = isValid && email(emailRef.current.value);

        if (isValid) {
            axios
                .post('https://dailyfix.herokuapp.com/auth/signup', {
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                    name: nameRef.current.value,
                })
                .then((res) => {
                    console.log(res.data);
                    context.setIsAuth(true);
                    context.setUserId(res.data.id);
                    context.setName(res.data.name);
                    localStorage.setItem('token', res.data.token);
                    navigate('/');
                });
        }
    };
    return (
        <div className={styles.container}>
            <header className={styles.header}>SignUp</header>
            <form className={styles.form}>
                <input
                    className={styles.input}
                    type='text'
                    placeholder='Full Name'
                    ref={nameRef}
                    required
                />
                <input
                    className={styles.input}
                    type='email'
                    placeholder='Email'
                    ref={emailRef}
                    required
                />
                <input
                    className={styles.input}
                    type='password'
                    placeholder='Password'
                    ref={passwordRef}
                    required
                />
            </form>
            <div className={styles.buttonContainer}>
                <button className={styles.btn} onClick={onSubmitHandler}>
                    Sign Up
                </button>
            </div>
            <footer>
                Already a member?&nbsp;<Link to='/login'>Login</Link>
            </footer>
        </div>
    );
};

export default SignUp;

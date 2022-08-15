import React from 'react';
import styles from './styles/AuthPage.module.scss';
import { useLocation } from 'react-router-dom';

import Logo from '../components/Logo/Logo';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';

const AuthPage = () => {
    const location = useLocation();
    const { pathname } = location;
    let component;
    if (pathname === '/login' || pathname === 'logout') {
        component = <Login />;
    } else if (pathname === '/sign-up') {
        component = <SignUp />;
    }

    return (
        <div className={styles.container}>
            <header>
                <Logo />
            </header>

            <main>{component}</main>
        </div>
    );
};

export default AuthPage;

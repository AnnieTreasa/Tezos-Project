import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import axios from 'axios';
import parse from 'html-react-parser';

import styles from './Card.module.scss';

const Card = (props) => {
    console.log(props.content);
    const onDeleteHandler = () => {
        axios
            .delete(`https://dailyfix.herokuapp.com/feed/writings/${props.id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.topBar}>
                <div className={styles.dateTime}>
                    <span className={styles.date}>{props.date}</span>
                    <span className={styles.time}>{props.time}</span>
                </div>
                <div className={styles.close}>
                    <IoCloseSharp className={styles.icon} onClick={onDeleteHandler} />
                </div>
            </div>
            <div className={styles.content}>{parse(props.content)}</div>
        </div>
    );
};

export default Card;

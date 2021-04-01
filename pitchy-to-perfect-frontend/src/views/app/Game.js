import React, { useState, useEffect, Fragment } from 'react';
import './game.css'

const Game = () => {
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
        window.location.replace('http://localhost:3000/login');
        } else {
        fetch('http://127.0.0.1:8000/api/v1/users/auth/user/', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
            setUserEmail(data.email);
            setLoading(false);
            });
        }
    }, []);

    const startGame = () => {
        console.log("Hello!!!")
        setIsActive(!isActive);
    };

    return (
        <div>
        {loading === false && (
            <Fragment>
            <h2>Hello {userEmail}!</h2>
            <div>
                <button onClick={startGame} className={`start-btn ${isActive ? "hidden" : ""}`} id="start">Start!</button>
                <button>🔊</button>
                replay note
            </div>
            <br />
            <div>
                <button className={`note-btn ${!isActive ? "hidden" : ""}`} id="note-btn">♪</button>
                <button className={`note-btn ${!isActive ? "hidden" : ""}`} id="note-btn">♪</button>
                <button className={`note-btn ${!isActive ? "hidden" : ""}`} id="note-btn">♪</button>
                <button className={`note-btn ${!isActive ? "hidden" : ""}`} id="note-btn">♪</button>
            </div>
            </Fragment>
        )}
        </div>
    );
};

export default Game;
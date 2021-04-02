import React, { useState, useEffect, Fragment } from 'react';
// import useSound from 'use-sound';
import * as Tone from 'tone'
// import cNote from '../../assets/C-Note.mp3'
import './game.css'

const Game = () => {
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [isActive, setIsActive] = useState(false);

    let isAnswerLeft = false;

    const synth = new Tone.Synth().toDestination();
    
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
        setIsActive(!isActive);
    };
    
    const myNotes = [
        "C4",
        "C#4",
        "D4",
        "D#4",
        "E4",
        "F4",
        "F#4",
        "G4",
        "G#4",
        "A4",
        "A#4",
        "B4"
    ];

    const randomNote = myNotes[Math.floor(Math.random()*myNotes.length)];
    
    

    
    const randomNote2 = myNotes[Math.floor(Math.random()*myNotes.length)];

    
    const PlayNote = () => {
        synth.triggerAttackRelease(randomNote, "8n");
        console.log(randomNote)
    };
    
    const getRandomAnswers = () => {
        let randomNum = Math.floor(Math.random() * 10)
        if ( randomNum % 2 === 0 ) {
            isAnswerLeft = true;
        } else {
            isAnswerLeft = false;
        }
    }
    
    getRandomAnswers()

    return (
        <div>
        {loading === false && (
            <Fragment>
            <h2>Hello {userEmail}!</h2>
            <div>
                <button onClick={startGame} className={`start-btn ${isActive ? "hidden" : ""}`} id="start">Start!</button>
                <div className={`play-note-btn ${!isActive ? "hidden" : ""}`}>
                    <button onClick={PlayNote}>🔊</button>
                    play note
                </div>
            </div>
            <br />
            <div>
                <button className={`note-btn ${!isActive ? "hidden" : ""}`} id="note-btn">{`${isAnswerLeft ?randomNote : randomNote2 }`}</button>
                <button className={`note-btn ${!isActive ? "hidden" : ""}`} id="note-btn">{`${isAnswerLeft ?randomNote2 : randomNote }`}</button>
            </div>
            </Fragment>
        )}
        </div>
    );
};

export default Game;
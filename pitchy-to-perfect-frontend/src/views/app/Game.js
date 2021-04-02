import React, { useState, useEffect, Fragment } from 'react';
import * as Tone from 'tone'
// import { Button, Icon } from 'semantic-ui-react'
// import PlayNoteButton from '../ui/PlayNoteButton'
import GetRandomNote from './utils/GetRandomNote'
import './game.css'

const Game = () => {
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [randomNote, setRandomNote] = useState("");
    const [wrongRandomNote, setWrongRandomNote] = useState("");
    const [isAnswerLeft, setIsAnswerLeft] = useState(false);
    const [currentScore, setCurrentScore] = useState(0);

    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();

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
                setUsername(data.username);
                setUserEmail(data.email);
                setLoading(false);
            });
        }
    }, []);

    const startGame = async () => {
        setIsActive(!isActive);
        setRandomNote(GetRandomNote())
        setWrongRandomNote(GetRandomNote())
        getRandomAnswers()
        // wrongNoteCheck()
    };

    const newRound = async () => {
        setRandomNote(GetRandomNote())
        setWrongRandomNote(GetRandomNote())
        getRandomAnswers()
        // wrongNoteCheck()
    }

    // Checks if wrong note is the same as random note and generates a new one if needed. not working
    // const wrongNoteCheck = () => {
    //     let wrongNote = wrongRandomNote
    //     console.log("Checking wrong note")
    //     console.log(randomNote, wrongRandomNote)
    //     if (wrongNote === randomNote) {
    //         console.log("*****double notes detected*****")
    //     }
    // }
    // let randomNote = myNotes[Math.floor(Math.random()*myNotes.length)];
    // let randomNote2 = myNotes[Math.floor(Math.random()*myNotes.length)];

    const PlayNote = () => {
        synth.triggerAttackRelease(randomNote, "8n");
        console.log(randomNote)
    };

    const PlayGrossNote = () => {
        console.log("GROSS!")
        synth.triggerAttackRelease("C#3", "8n")
        
    }

    const getRandomAnswers = () => {
        let randomNum = Math.floor(Math.random() * 10)
        if ( randomNum % 2 === 0 ) {
            setIsAnswerLeft(true);
        } else {
            setIsAnswerLeft(false);
        }
    }

    const successCheckLeft = () => {

        console.log("note choice check")
        // wrongRandomNote === randomNote is a temp fix while it continues to get doubles
        if (isAnswerLeft === true || wrongRandomNote === randomNote) {
            console.log("Correct Answer!")
            PlayNote()
            newRound()
            setCurrentScore(currentScore + 1)
        } else {
            console.log("Wrong Answer!")
            newRound()
            setCurrentScore(currentScore - currentScore)
            PlayGrossNote()
        }   
    }

    const successCheckRight = () => {

        if (isAnswerLeft === false || wrongRandomNote === randomNote) {
            console.log("Correct Answer!")
            PlayNote()
            newRound()
            setCurrentScore(currentScore + 1)
        } else {
            console.log("Wrong Answer!")
            newRound()
            setCurrentScore(currentScore - currentScore)
            PlayGrossNote()
        }   
    }

    return (
        <div>
        {loading === false && (
            <Fragment>
            <h2>Hello {username}!</h2>
            <div>
                {/* <PlayNoteButton /> */}
                <button onClick={startGame} className={`start-btn ${isActive ? "hidden" : ""}`} id="start">Start!</button>
            </div>
            <div>
                <div>current score: {currentScore}</div>
                <div className={`play-note-btn ${!isActive ? "hidden" : ""}`}>
                    <button onClick={PlayNote}>🔊</button>
                    play note
                </div>
                <br />
                <div>
                    <button 
                        onClick={successCheckLeft} 
                        className={`note-btn ${!isActive ? "hidden" : ""}`} 
                        id="note-btn"
                        value={`${isAnswerLeft ?randomNote : wrongRandomNote }`}>
                            {`${isAnswerLeft ?randomNote : wrongRandomNote }`}
                    </button>
                    <button
                        onClick={successCheckRight} 
                        className={`note-btn ${!isActive ? "hidden" : ""}`} 
                        id="note-btn"
                        value={`${isAnswerLeft ?wrongRandomNote : randomNote }`}>
                            {`${isAnswerLeft ?wrongRandomNote : randomNote }`}
                    </button>
                </div>

            </div>
            </Fragment>
        )}
        </div>
    );
};

export default Game;
import React, { useState, useEffect, Fragment } from 'react';
import * as Tone from 'tone'
// import { Button, Icon } from 'semantic-ui-react'
// import PlayNoteButton from '../ui/PlayNoteButton'
import GetRandomNote from './utils/GetRandomNote'
import './game.css'

const Game = () => {
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [randomNote, setRandomNote] = useState("")
    const [wrongRandomNote, setWrongRandomNote] = useState("")
    const [isAnswerLeft, setIsAnswerLeft] = useState(false);
    // let isAnswerLeft = false;

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

    const getRandomAnswers = () => {
        let randomNum = Math.floor(Math.random() * 10)
        console.log("Random answer check")
        if ( randomNum % 2 === 0 ) {
            setIsAnswerLeft(true);
            console.log("left test")
        } else {
            setIsAnswerLeft(false);
            console.log("right test")
        }
        
    }

    const successCheckLeft = () => {
        
        console.log("note choice check")
        if (isAnswerLeft === true || wrongRandomNote === randomNote) {
            console.log("Correct Answer!")
            PlayNote()
            newRound()
        } else {
            console.log("Wrong Answer!")
            newRound()
        }   
    }

    const successCheckRight = () => {
        
        console.log("note choice check")
        if (isAnswerLeft === false || wrongRandomNote === randomNote) {
            console.log("Correct Answer!")
            PlayNote()
            newRound()
        } else {
            console.log("Wrong Answer!")
            newRound()
        }   
    }

    return (
        <div>
        {loading === false && (
            <Fragment>
            <h2>Hello {userEmail}!</h2>
            <div>
                {/* <PlayNoteButton /> */}
                <button onClick={startGame} className={`start-btn ${isActive ? "hidden" : ""}`} id="start">Start!</button>
                <div className={`play-note-btn ${!isActive ? "hidden" : ""}`}>
                    <button onClick={PlayNote}>🔊</button>
                    play note
                </div>
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
            </Fragment>
        )}
        </div>
    );
};

export default Game;
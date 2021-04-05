import React, { useState, useEffect, Fragment } from 'react';
import * as Tone from 'tone'
import GetRandomNote from './utils/GetRandomNote'
import { Button, Header, Icon, Grid } from 'semantic-ui-react'
import './game.css'

const Game = () => {
    const [userId, setUserId] = useState(0)
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [randomNote, setRandomNote] = useState("");
    const [wrongRandomNote, setWrongRandomNote] = useState("");
    const [isAnswerLeft, setIsAnswerLeft] = useState(false);
    const [currentScore, setCurrentScore] = useState(0);
    const [highScore, setHighScore] = useState(0)

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
                console.log(data)
                setUserId(data.id)
                setUsername(data.username)
                setHighScore(data.highest_score)
                setLoading(false);
            });
        }
    }, []);

    const postHighScore = () => {
        const date = new Date();
        const currentDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
        let scoreData = {
            score: currentScore,
            date: currentDate,
            user: userId
            // user: currentUser
        }
        if (currentScore > highScore) {
            setHighScore(currentScore)
            fetch('http://127.0.0.1:8000/api/v1/users/scores/', {
                method: 'POST',
                body: JSON.stringify(scoreData), 
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`           
                }
            })
            .then(res => res.json())
            .then(res => console.log(res))
        }
    }

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
            console.log("Correct Answer! now it should be green")
            PlayNote()
            setTimeout( () => {
                newRound()
                setCurrentScore(currentScore + 1)
            }, 1000)
            
        } else {
            console.log("Wrong Answer!")
            PlayGrossNote()
            postHighScore()
            setTimeout( () => {
                newRound()
                setCurrentScore(currentScore - currentScore)
            }, 1000)
        }   
    }

    const successCheckRight = () => {

        if (isAnswerLeft === false || wrongRandomNote === randomNote) {
            console.log("Correct Answer!")
            PlayNote()
            setTimeout( () => {
                newRound()
                setCurrentScore(currentScore + 1)
            }, 1000)
        } else {
            console.log("Wrong Answer!")
            PlayGrossNote()
            postHighScore()
            setTimeout( () => {
                newRound()
                setCurrentScore(currentScore - currentScore)
            }, 1000)
        }   
    }

    return (
        <div>
        {loading === false && (
            <Fragment>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <div className="game-container">
                            <Header as="h2" textAlign="center">Hello {username}!</Header>
                            <div>high score: {highScore}</div>
                            <div>current score: {currentScore}</div>
                            <div className={`start-btn main-btns ${isActive ? "hidden" : ""}`}>
                            {/* <PlayNoteButton /> */}
                                <Button size='huge' primary onClick={startGame} className="start-btn" id="start">Start!</Button>
                            </div>
                            <div className={`game-btns ${!isActive ? "hidden" : ""}`}>
                                <div className='play-note-btn main-btns'>
                                    <Button size='huge' primary onClick={PlayNote}>
                                        <Icon name='volume up' size='large'/>
                                        {/* <Icon name='itunes note' /> */}
                                    </Button>
                                        <br />
                                    <div>*play note*</div>
                                </div>
                                <br />
                                <div>
                                    <div>Which note is this?</div>
                                    <Button size='huge' secondary 
                                        onClick={successCheckLeft} 
                                        className='note-btn'
                                        id="note-btn"
                                        value={`${isAnswerLeft ?randomNote : wrongRandomNote }`}>
                                            {`${isAnswerLeft ?randomNote.slice(0,randomNote.length-1) : wrongRandomNote.slice(0,wrongRandomNote.length-1) }`}
                                    </Button>
                                    <Button size='huge' secondary
                                        onClick={successCheckRight}
                                        className='note-btn' 
                                        id="note-btn"
                                        value={`${isAnswerLeft ?wrongRandomNote : randomNote }`}>
                                            {`${isAnswerLeft ?wrongRandomNote.slice(0,wrongRandomNote.length-1) : randomNote.slice(0,randomNote.length-1) }`}
                                    </Button>
                                </div>
                            </div>
                        </div>                       
                    </Grid.Column>
                </Grid>
            </Fragment>
        )}
        </div>
    );
};

export default Game;
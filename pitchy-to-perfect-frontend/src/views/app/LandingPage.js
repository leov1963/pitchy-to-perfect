import React, { useState, useEffect, Fragment } from 'react';
import * as Tone from 'tone'
import GetRandomNote from './utils/GetRandomNote'
import { Button, Header, Icon, Grid, Segment } from 'semantic-ui-react'
import './game.css'


const LandingPage = () => {
    const [randomNote, setRandomNote] = useState("");
    const [wrongRandomNote, setWrongRandomNote] = useState("");
    const [isAnswerLeft, setIsAnswerLeft] = useState(false);
    const [currentScore, setCurrentScore] = useState(0);
    const [rest, setRest] = useState(false);
    const [isActive, setIsActive] = useState(false);
    
    const synth = new Tone.Synth().toDestination();
    
    const startGame = async () => {
        setIsActive(!isActive);
        setRandomNote(GetRandomNote())
        setWrongRandomNote(GetRandomNote())
        getRandomAnswers()
        PlayDing()
    };
    
    const newRound = async () => {
        setRandomNote(GetRandomNote())
        setWrongRandomNote(GetRandomNote())
        getRandomAnswers()
    }
    
    const PlayNote = () => {
        synth.triggerAttackRelease(randomNote, "8n");
        console.log(randomNote)
    };
    
    const PlayGrossNote = () => {
        console.log("GROSS!")
        synth.triggerAttackRelease("C#3", "8n")
        
    }
    
    const PlayDing = () => {
        synth.triggerAttackRelease("C#6", "5000n")
        
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
            setRest(true)
            setTimeout( () => {
                setRest(false)
                newRound()
                setCurrentScore(currentScore + 1)
            }, 2000)
            
        } else {
            console.log("Wrong Answer!")
            PlayGrossNote()
            setRest(true)
            setTimeout( () => {
                setRest(false)
                newRound()
                setCurrentScore(currentScore - currentScore)
            }, 2000)
        }   
    }
    
    const successCheckRight = () => {
    
        if (isAnswerLeft === false || wrongRandomNote === randomNote) {
            console.log("Correct Answer!")
            PlayNote()
            setRest(true)
            setTimeout( () => {
                setRest(false)
                newRound()
                setCurrentScore(currentScore + 1)
            }, 2000)
        } else {
            console.log("Wrong Answer!")
            PlayGrossNote()
            setRest(true)
            setTimeout( () => {
                newRound()
                setCurrentScore(currentScore - currentScore)
                setRest(false)
            }, 2000)
        }   
    }

    return (
        
        <div>
            <Fragment>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <div className="scores-container">
                            <Header as="h2">Pitchy to Perfect</Header>
                            <Segment>
                                <div className="landing-info">
                                    Welcome to pitchy to perfect where you can train your ear to recognize all the notes of an octive!
                                    <a className='sign-up-link' href='/signup'> Create an account</a>, press the start button, and start guessing! press the play note button to hear the note, and try to guess which of the two notes displayed it is.
                                    Be sure to pick the right note and good luck! 
                                </div>
                            </Segment>
                            <div>current score: {currentScore}</div>
                            <br />
                            <div className={`start-btn main-btns ${isActive ? "hidden" : ""}`}>
                                <Button size='huge' primary onClick={startGame} className="start-btn" id="start">Start!</Button>
                            </div>
                            <div className={`game-btns ${!isActive ? "hidden" : ""}`}>
                                <div className='play-note-btn main-btns'>
                                    <Button size='huge' primary onClick={PlayNote}>
                                        <Icon name='volume up' size='large'/>
                                        <Icon name='itunes note' />
                                    </Button>
                                        <br />
                                    <div>*play note*</div>
                                </div>
                                <br />
                                {rest === true && (
                                    <div>
                                        <a href='signup'>Create an account</a> to save high score!
                                    </div>
                                )}
                                {rest === false && (
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
                                )}
                            </div>
                        </div>                       
                    </Grid.Column>
                </Grid>
            </Fragment>
        </div>
    );
}

export default LandingPage;
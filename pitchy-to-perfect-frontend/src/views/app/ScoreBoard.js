import React, { useState, useEffect, Fragment } from 'react';
import { Button, Header, Icon, Grid, Segment } from 'semantic-ui-react'
import './scoreboard.css'

console.log("hello world")

const ScoreBoard = () => {
    
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({})
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/v1/users/scores/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',            
            }
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            setData(data.high_scores)
            setLoading(false)
            console.log(data)
            });
    }, []);

    const scoreElements = []
    const postScoreList = () => {
        for (let score of data) {
            scoreElements.push(<Segment vertical><li className="user-scores" key={score}>Score: {score.score} <div>Date: {score.date}</div> <div>Username: {score.username}</div> </li></Segment>)
        }
    }

    return (
        
        <div>
        {loading === false && (
            <Fragment>
                {postScoreList()}
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <div className="scores-container">
                            <br />
                            <Header as="h2" className="scores-header">High Scores:</Header>
                            <ol>{scoreElements}</ol>
                        </div>                       
                    </Grid.Column>
                </Grid>
            </Fragment>
        )}
        </div>
    );
}

export default ScoreBoard;
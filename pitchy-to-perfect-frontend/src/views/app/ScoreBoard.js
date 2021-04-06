import React, { useState, useEffect, Fragment } from 'react';
import { Button, Header, Icon, Grid } from 'semantic-ui-react'

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
    
    let orderedScores = [];
    const topScores = () => {
        const scores = []
        for (let i = 0; i < data.length; i++) {
            scores.push(data[i])
        }
        function sortScore(a, b) {
            return b.score - a.score;
        }
        scores.sort(sortScore)
        orderedScores = scores
    } 
    
    

    const scoreElements = []
    const postScoreList = () => {
        for (let score of orderedScores) {
            scoreElements.push(<li key={score}>{"Score: " + score.score + " Date: " + score.date + " User: " + score.username}</li>)
        }
    }

    return (
        
        <div>
        {loading === false && (
            <Fragment>
                {topScores()}
                {postScoreList()}
                {console.log(orderedScores)}
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <div className="scores-container">
                            <Header as="h2">High Scores:</Header>
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
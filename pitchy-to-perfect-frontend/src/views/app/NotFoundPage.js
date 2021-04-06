import React, { useState, useEffect, Fragment } from 'react';
import { Button, Header, Icon, Grid, Segment } from 'semantic-ui-react'
import cuteFox from '../../assets/cute-fox.gif'
import './notfound.css'

const NotFoundPage = () => {

    return (
        
        <div>
            <Fragment>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <div className="scores-container">
                            <Header as="h2">Page not found!</Header>
                            <Segment>
                                <br />
                                <div className="not-found-message">
                                    Looks like you're a bit lost buddy!
                                    <br />
                                    Let's turn around and go to <a href='/login'>login</a>.
                                </div>
                                <img src={cuteFox} alt="cute fox" />
                            </Segment>
                        </div>                       
                    </Grid.Column>
                </Grid>
            </Fragment>
        </div>
    );
}

export default NotFoundPage;
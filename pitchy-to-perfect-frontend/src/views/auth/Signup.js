import React, { useState, useEffect } from 'react';
import { Button, Form, Grid, Header, Message, Segment, Icon } from 'semantic-ui-react';


const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
        window.location.replace('http://localhost:3000/game');
        } else {
        setLoading(false);
        }
    }, []);

    const onSubmit = e => {
        e.preventDefault();

        const user = {
        username: username,
        email: email,
        password1: password1,
        password2: password2
        };

        fetch('http://127.0.0.1:8000/api/v1/users/auth/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if (data.key) {
            localStorage.clear();
            localStorage.setItem('token', data.key);
            window.location.replace('http://localhost:3000/game');
            } else {
            setEmail('');
            setPassword1('');
            setPassword2('');
            setUsername('');
            localStorage.clear();
            setErrors(true);
            }
        });
    };

    return (
        <div>
        {loading === false}
        {errors === true && <h2>Cannot signup with provided credentials</h2>}
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>                
                <Header as='h2' color='teal' textAlign='center'>
                    <Icon size='huge' name='signup' />Sign-up!
                </Header>
                <Form size='large' onSubmit={onSubmit}>
                    <Segment stacked>
                        
                        {/* <label htmlFor='email'>Username:</label> <br /> */}
                        <Form.Input 
                            fluid 
                            icon='user' 
                            iconPosition='left' 
                            placeholder='User Name' 
                            onChange={e => setUsername(e.target.value)}
                        />
                        <br />           
                        {/* <label htmlFor='email'>Email address:</label> <br /> */}
                        <Form.Input 
                            fluid 
                            icon='mail' 
                            iconPosition='left' 
                            placeholder='E-mail address' 
                            onChange={e => setEmail(e.target.value)}
                        />
                        <br />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange={e => setPassword1(e.target.value)}
                        />
                        <br />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange={e => setPassword2(e.target.value)}
                        />
                        <br />
                        <Button color='teal' fluid size='large'>
                            Sign-up
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
        </div>
    );
};

export default Signup;
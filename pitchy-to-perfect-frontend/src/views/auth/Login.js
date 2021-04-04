import React, { useState, useEffect } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react';
import './auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        email: email,
        password: password
        };

        fetch('http://127.0.0.1:8000/api/v1/users/auth/login/', {
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
            setPassword('');
            localStorage.clear();
            setErrors(true);
            }
        });
    };

    return (
        <div>
        {/* {loading === false && <h1>Login</h1>} */}
        {errors === true && <h2>Cannot log in with provided credentials</h2>}
        {loading === false && (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Icon size='huge' name='sign-in' />Log-in to your account
                    </Header>
                    <Form size='large' onSubmit={onSubmit}>
                        <Segment stacked>
                            {/* <label htmlFor='email'>Email address:</label> <br />
                            <input
                                name='email'
                                type='email'
                                value={email}
                                required
                                onChange={e => setEmail(e.target.value)}
                            />{' '} */}
                            <Form.Input 
                                fluid 
                                icon='user' 
                                iconPosition='left' 
                                placeholder='E-mail address' 
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                onChange={e => setPassword(e.target.value)}
                            />
                            
                            {/* <label htmlFor='password'>Password:</label> <br />
                            <input
                                name='password'
                                type='password'
                                value={password}
                                required
                                onChange={e => setPassword(e.target.value)}
                            />{' '} */}
                            
                            <Button color='teal' fluid size='large'>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <a className='sign-up-link' href='/signup'>Sign Up</a>
                    </Message>
                </Grid.Column>
            </Grid>
        )}
        </div>
    );
};

export default Login;
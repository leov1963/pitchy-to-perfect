import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
import './navbar.css'

const Navbar = () => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setIsAuth(true);
        }
    }, []);

    return (
        <div>
            <Menu stackable icon='labeled'> 
                <Menu.Item>
                    <Link to='/'>
                        <div id="container">
                            <div id="flip">
                                <div><div>Perfect</div></div>
                                <div><div>to</div></div>
                                <div><div>Pitchy</div></div>
                            </div>
                        </div>
                    </Link>
                </Menu.Item>
                <Menu.Menu position='right'>
                    {isAuth === true ? (
                    <Fragment>
                        {' '}                            
                        <Menu.Item as='a' color='black'>
                            <Link to='/game'>
                                <Icon name='gamepad' />
                                Game
                            </Link>
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <Link to='/logout'>
                                <Icon name='sign-out' />
                                Logout
                            </Link>
                        </Menu.Item>
                    </Fragment>
                    ) : (
                    <Fragment>
                        {' '}
                        <Menu.Item as='a'>
                            <Link to='/login'>
                                <Icon name='sign-in' />
                                Login
                            </Link>
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <Link to='/signup'>
                                <Icon name='signup' />
                                Signup
                            </Link>
                        </Menu.Item>
                    </Fragment>
                    )}                
                </Menu.Menu>
            </Menu>
        </div>
    );
};

export default Navbar;
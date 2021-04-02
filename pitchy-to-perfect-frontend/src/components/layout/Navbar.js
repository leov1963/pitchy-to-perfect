import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const Navbar = () => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setIsAuth(true);
        }
    }, []);

    return (
        <Menu stackable className="ui stackable menu"> 
            <div>
                {isAuth === true ? (
                <Fragment>
                    {' '}
                    <Menu.Item>P2P</Menu.Item>
                    <Menu.Item className="item">
                        <li>
                        <Link to='/game'>Game</Link>
                        </li>
                    </Menu.Item>
                    <Menu.Item>
                        <li>
                        <Link to='/logout'>Logout</Link>
                        </li>
                    </Menu.Item>
                </Fragment>
                ) : (
                <Fragment>
                    {' '}
                    <Menu.Item>
                        <li>
                        <Link to='/login'>Login</Link>
                        </li>
                    </Menu.Item>
                    <Menu.Item>
                        <li>
                        <Link to='/signup'>Signup</Link>
                        </li>
                    </Menu.Item>
                </Fragment>
                )}
            </div>
        </Menu>
    );
};

export default Navbar;
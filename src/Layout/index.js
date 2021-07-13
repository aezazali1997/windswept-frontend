import React, { useState, useEffect, useContext } from 'react'
import { Navbar, NavDropdown } from '../components';
import ScrollUp from '../components/scrollUp';

const CustomLayout = ({ children, login, handleLogin, handleLogout }) => {

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {

        const hideMenu = () => {
            if (window.innerWidth > 768 && isOpen) {
                setIsOpen(false);
                console.log('i resized');
            }
        };

        window.addEventListener('resize', hideMenu);

        return () => {
            window.removeEventListener('resize', hideMenu);
        };
    });


    const toggle = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div>
            {login ?
                <div>
                    <Navbar
                        toggle={toggle}
                        login={login}
                        isOpen={isOpen}
                        handleLogin={handleLogin}
                        handleLogout={handleLogout}
                    />

                    <NavDropdown
                        isOpen={isOpen}
                        toggle={toggle}
                        handleLogin={handleLogin}
                        handleLogout={handleLogout}
                        login={login}
                    />
                </div>
                : ''
            }
            {children}
            <ScrollUp />
        </div>
    )
}

export default CustomLayout;

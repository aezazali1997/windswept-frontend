import React, { useState, useEffect, useContext } from 'react'
import { Navbar, NavDropdown } from '../components';
import ScrollUp from '../components/scrollUp';

const CustomLayout = ({ children, login, handleLogout }) => {

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
                <div className={isOpen ? 'z-50 fixed top-0 w-full' : 'z-0'} >
                    <Navbar
                        toggle={toggle}
                        login={login}
                        isOpen={isOpen}
                        handleLogout={handleLogout}
                    />

                    <NavDropdown
                        isOpen={isOpen}
                        toggle={toggle}
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

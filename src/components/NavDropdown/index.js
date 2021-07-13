import React from 'react';
import { NavLink } from 'react-router-dom';

const NavDropdown = ({ isOpen, toggle, login, handleLogin, handleLogout }) => {
    return (
        <div
            className={
                isOpen
                    ? 'grid grid-rows-4 absolute w-full text-center items-center bg-white border-b-1 shadow-lg z-50'
                    : 'hidden'
            }
            onClick={toggle}
        >
            {
                login ?
                    <>
                        <NavLink to='/dashboard' className='p-4 '>
                            Dashboard
                        </NavLink>
                        <NavLink to='/new-estimate' className='p-4'>
                            Estimator
                        </NavLink>
                        <NavLink to='/toggle-tutorials' className='p-4'>
                            Toggle Tutorials
                        </NavLink>
                        <NavLink to='/contact' className='p-4'>
                            Contact
                        </NavLink>
                        <NavLink to='/terms-of-services' className='p-4'>
                            Terms of Services
                        </NavLink>
                        <NavLink to='#' onClick={handleLogout} className='p-4 font-sans active'>
                            Logout
                        </NavLink>
                    </>
                    :
                    <NavLink to='#' onClick={handleLogin} className='p-4 font-sans text-red-600'>
                        Login
                    </NavLink>
            }
        </div>
    );
};

export default NavDropdown;
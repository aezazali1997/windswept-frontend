import React from 'react';
import { NavLink } from 'react-router-dom';

const NavDropdown = ({ isOpen, toggle, handleLogout }) => {
    return (
        <div
            className={
                isOpen
                    ? 'grid grid-rows-4 absolute w-full text-center items-center bg-white border-b-1 shadow-lg z-50'
                    : 'hidden'
            }
            onClick={toggle}
        >
            <>
                <NavLink to='/dashboard' className='p-4 font-sans '>
                    Dashboard
                </NavLink>
                <NavLink to='/new-estimate' className='p-4 font-sans '>
                    Estimator
                </NavLink>
                <NavLink to='/toggle-tutorials' className='p-4 font-sans '>
                    Tutorials
                </NavLink>
                <NavLink to='/contact' className='p-4 font-sans '>
                    Contact
                </NavLink>
                <NavLink to='/terms-of-services' className='p-4 font-sans '>
                    Terms of Services
                </NavLink>
                <button onClick={handleLogout} className='p-4 font-sans '>
                    Logout
                </button>
            </>
        </div>
    );
};

export default NavDropdown;
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavDropdown = ({ isOpen, toggle }) => {
    return (
        <div
            className={
                isOpen
                    ? 'grid grid-rows-4 absolute w-full text-center items-center bg-white border-b-1 shadow-lg'
                    : 'hidden'
            }
            onClick={toggle}
        >
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
        </div>
    );
};

export default NavDropdown;
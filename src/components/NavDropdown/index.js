import React from 'react';
import { NavLink } from 'react-router-dom';

const NavDropdown = ({ isOpen, toggle, handleLogout }) => {
    return (
        <div
            className={
                isOpen
                    ? 'grid grid-rows-4  w-full text-center items-center bg-white border-b-1 pb-5 shadow-lg z-50'
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
                <button type="button" onClick={handleLogout}
                    className="p-4 font-weight: 600px;
                        uppercase font-sans text-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none ">
                    Logout
                </button>
            </>
        </div>
    );
};

export default NavDropdown;
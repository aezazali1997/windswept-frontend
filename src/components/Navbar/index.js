import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sling as Hamburger } from 'hamburger-react'
import Button from '../Button';

const Navbar = ({ toggle, isOpen, login, handleLogin, handleLogout }) => {
    return (
        <nav
            className={`flex justify-between  items-center h-16 bg-white text-black relative shadow-sm font-mono'
            role='navigation`}
        >
            <Link to='/dashboard' className='pl-8'>
                <img className="mx-auto h-9 w-auto" src="https://windsweptmarketing.com/wp-content/uploads/2015/12/logo.png" alt="Workflow" />
            </Link>
            <div className='px-4 lg:hidden'>
                <Hamburger toggled={isOpen} onToggle={toggle} color='#dc2626' direction="right" duration={0.5} rounded />
            </div>

            <div className='pr-8 lg:block  hidden'>
                {
                    login ?
                        <>
                            <NavLink to='/dashboard' className='p-4 font-sans' activeClassName="active">
                                DashBoard
                            </NavLink>
                            <NavLink to='/new-estimate' className='p-4 font-sans' activeClassName="active">
                                Estimator
                            </NavLink>
                            <NavLink to='/toggle-tutorials' className='p-4 font-sans' activeClassName="active" >
                                Toggle Tutorials
                            </NavLink>
                            <NavLink to='/contact' className='p-4 font-sans' activeClassName="active">
                                Contact
                            </NavLink>
                            <NavLink to='/terms-of-services' className='p-4 font-sans' activeClassName="active">
                                Terms of Services
                            </NavLink>
                            <NavLink to='#' onClick={handleLogout} className='p-4 font-sans'>
                                Logout
                            </NavLink>
                        </>
                        : ''
                }
            </div>
        </nav>
    );
};

export default Navbar;

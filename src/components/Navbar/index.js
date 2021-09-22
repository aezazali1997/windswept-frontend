import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sling as Hamburger } from 'hamburger-react'
import { AdminRoutes, CustomerRoutes } from '../../utils/consts';

const Navbar = ({ toggle, isOpen, login, handleLogout }) => {

    return (
        <nav
            className='flex justify-between items-center h-16 text-black relative shadow-md font-mono navbar'
            role='navigation'
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
                            {
                                localStorage.getItem('type') === 'Admin' ?
                                    AdminRoutes.map(({ name, route }, index) => (
                                        <NavLink key={index} to={route} className='p-4 font-sans nav-link nav-link-ltr' activeClassName="active">
                                            {name}
                                        </NavLink>
                                    ))
                                    :
                                    CustomerRoutes.map(({ name, route }, index) => (
                                        <NavLink key={index} to={route} className='p-4 font-sans nav-link nav-link-ltr' activeClassName="active">
                                            {name}
                                        </NavLink>
                                    ))
                            }
                            <button type="button" onClick={handleLogout}
                                className="p-4 font-weight: 600px;
                                uppercase font-sans text-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none ">
                                Logout
                            </button>
                        </>
                        : ''
                }
            </div>
        </nav>
    );
};

export default Navbar;

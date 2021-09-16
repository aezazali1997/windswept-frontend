import React from 'react';
import { NavLink } from 'react-router-dom';
import { AdminRoutes, CustomerRoutes } from '../../utils/consts';

const NavDropdown = ({ isOpen, toggle, handleLogout }) => {

    return (
        <>        <div onClick={toggle}
            className={`
            ${isOpen ?
                    "fixed top-16 z-30 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" :
                    "hidden"
                }`} >
            <div
                className={
                    'relative grid grid-rows-4 w-full text-center items-center bg-white border-b-1 pb-5 shadow-lg z-50'
                }
                onClick={toggle}
            >
                <>
                    {
                        localStorage.getItem('type') === 'customer' ?
                            CustomerRoutes.map(({ route, name }, index) => (
                                <NavLink key={index} to={route} className='p-4  font-sans '>
                                    {name}
                                </NavLink>

                            ))
                            :
                            AdminRoutes.map(({ route, name }, index) => (
                                <NavLink key={index} to={route} className='p-4 font-sans '>
                                    {name}
                                </NavLink>
                            ))
                    }
                    <div>
                        <button type="button" onClick={handleLogout}
                            className="p-4 self-end 
                        uppercase font-sans text-center py-2 px-4 w-44 border border-transparent text-sm font-medium
                        rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                        >
                            Logout
                        </button>
                    </div>
                </>
            </div>
        </div>
        </>

    );
};

export default NavDropdown;
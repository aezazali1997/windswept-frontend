import React, { useState, useEffect } from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import Dropdown from './components/Dropdown';
import { Login, ForgetPassword, Signup } from './pages/Auth';
import { OrderEstimate, Dashboard, Contact, ToggleTutorials, TermsOfServices } from './pages';
import { Navbar, NavDropdown } from './components';

function App() {
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
    <>
      <Navbar toggle={toggle} isOpen={isOpen} />
      <NavDropdown isOpen={isOpen} toggle={toggle} />
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path='/forget-password' component={ForgetPassword} />
        <Route path='/new-estimate' component={OrderEstimate} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/toggle-tutorials' component={ToggleTutorials} />
        <Route exact path='/terms-of-services' component={TermsOfServices} />

        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;

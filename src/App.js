import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import CustomLayout from './Layout';
import { Login, ForgetPassword, Signup } from './pages/Auth';
import { OrderEstimate, Dashboard, Contact, ToggleTutorials, TermsOfServices } from './pages';


function App() {

  const history = useHistory();
  const [authorized, setAuthorized] = useState(null)


  const handleLogout = async () => {
    console.log('inLogout');
    await localStorage.clear();
    window.location = ('/')
  }
  const handleLogin = async () => {
    console.log('in Login');
    setAuthorized(await localStorage.setItem('login', true));
    history.push('/dashboard')
  }

  useEffect(() => {
    const login = localStorage.getItem('login')
    console.log(login)
    if (login === true) {
      setAuthorized(login);
    }
    setAuthorized(login)
  }, [])

  useEffect(() => {

  }, [authorized])


  return (
    <>
      <CustomLayout handleLogin={handleLogin} handleLogout={handleLogout} login={authorized}>
        {
          authorized === "true" ?
            <Switch>
              <Route path='/new-estimate' component={OrderEstimate} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/contact' component={Contact} />
              <Route path='/toggle-tutorials' component={ToggleTutorials} />
              <Route path='/terms-of-services' component={TermsOfServices} />
              <Redirect to="/new-estimate" />
            </Switch>
            :
            <Switch>
              <Route path='/' exact component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path='/forget-password' component={ForgetPassword} />
              <Redirect to="/" />
            </Switch>
        }
      </CustomLayout>
    </>
  );
}

export default App;

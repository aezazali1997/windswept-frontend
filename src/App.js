import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import CustomLayout from './Layout';
import { Login, ForgetPassword, Signup } from './pages/Auth';
import { OrderEstimate, Dashboard, Contact, ToggleTutorials, TermsOfServices } from './pages';


function App() {

  const history = useHistory();
  const [authorized, setAuthorized] = useState(localStorage.getItem('login'))

  const handleLogout = async () => {
    console.log('inLogout');
    await localStorage.clear();
    window.location = ('/login')
  }

  useEffect(() => {

  }, [authorized])


  return (
    <>
      <CustomLayout handleLogout={handleLogout} login={authorized}>
        {
          authorized ?
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
              <Route path="/login" component={Login} />
              {/* <Route path="/signup" component={Signup} /> */}
              {/* <Route path='/forget-password' component={ForgetPassword} /> */}
              <Redirect from="/" to="/login" />
              <Redirect to="/login" />

            </Switch>
        }
      </CustomLayout>
    </>
  );
}

export default App;

import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import CustomLayout from './Layout';
import { Login, AdminLogin } from './pages/Auth';
import { OrderEstimate, Dashboard, Contact, ToggleTutorials, TermsOfServices } from './pages';
import { PriceSheet } from './pages/AdminDashboard';

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
            localStorage.getItem('type') === 'customer' ?
              <Switch>
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/contact' component={Contact} />
                <Route path='/toggle-tutorials' component={ToggleTutorials} />
                <Route path='/terms-of-services' component={TermsOfServices} />
                <Redirect to="/dashboard" />
              </Switch>
              :
              <Switch>
                <Route path='/admin/wimpie' component={OrderEstimate} />
                <Route path='/admin/price-sheet' component={PriceSheet} />
                <Redirect to="/admin/wimpie" />
              </Switch>
            :
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/admin/login" component={AdminLogin} />
              <Redirect from="/" to="/login" />
              <Redirect to="/login" />
            </Switch>
        }
      </CustomLayout>
    </>
  );
}

export default App;

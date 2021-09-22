import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { isEmpty } from 'lodash';
import CustomLayout from './Layout';
import { Login, AdminLogin } from './pages/Auth';
import { PriceSheet } from './pages/AdminDashboard';
import { OrderEstimate, Dashboard, Contact, ToggleTutorials, TermsOfServices } from './pages';
import axiosInstance from './APIs/axiosInstance';

function App() {

  const [authorized, setAuthorized] = useState()
  const [loading, setLoading] = useState(true)
  const [userType, SetUserType] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (isEmpty(token)) {
      setLoading(false);
      setAuthorized(false);
    } else {
      checkToken(token)
    }
  }, [])

  const checkToken = async () => {
    try {
      // function to check token validation and user type
      let { data: { data: { userType } } } = await axiosInstance.getUserType();
      localStorage.setItem('type', userType);
      setAuthorized(true)
      SetUserType(userType)
    } catch (e) {
      setAuthorized(false)
    } finally {
      setLoading(false);
    }
  }
  const handleLogout = () => {
    localStorage.clear();
    window.location = '/login'

  }
  return !loading && (
    <>
      <CustomLayout handleLogout={handleLogout} login={authorized}>
        {
          authorized ?
            userType === 'Admin' ?
              <Switch>
                <Route path='/admin/wimpie' component={OrderEstimate} />
                <Route path='/admin/price-sheet' component={PriceSheet} />
                <Redirect to="/admin/wimpie" />
              </Switch>
              :
              <Switch>
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/contact' component={Contact} />
                <Route path='/toggle-tutorials' component={ToggleTutorials} />
                <Route path='/terms-of-services' component={TermsOfServices} />
                <Redirect to="/dashboard" />
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

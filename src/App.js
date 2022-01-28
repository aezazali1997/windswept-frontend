import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { isEmpty } from 'lodash';
import CustomLayout from './Layout';
import { Login, AdminLogin } from './pages/Auth';
import Swal from 'sweetalert2';
import { PriceSheet } from './pages/AdminDashboard';
import { OrderEstimate, Dashboard, Contact, ToggleTutorials, TermsOfServices } from './pages';

function App() {
  
  
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState();

  useEffect(() => {
    const id = localStorage.getItem('user_id');

    if (isEmpty(id)) {
      setLoading(false);
      setAuthorized(false);
    } else {
      setAuthorized(true);
      setUserType(localStorage.getItem('role'));
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Confirm Logout?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      buttonsStyling: false,
      customClass: {
        confirmButton:
          'w-96 inline-flex justify-center border  px-4 py-2 btn  text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm custom-btn-style hover:text-red-600 hover:bg-transparent hover:border-red-600',
        cancelButton:
          'mt-3 w-full inline-flex justify-center hover:underline cursor-pointer px-4 py-2 text-sm font-medium text-gray-600  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm hover:underline hover:text-red-500',   
        }
    }).then(async (result) => {
      if(result.isConfirmed){
        if (localStorage.getItem('role')==='admin'){
          window.location = '/admin/login';
        }
        else{
          window.location = '/login';
        }
        localStorage.clear();
      }
    })
    
  };
  return (
    !loading && (
      <>
        <CustomLayout handleLogout={handleLogout} login={authorized}>
          {authorized ? (
            (userType === 'manager' || userType==='employee')  ? (
              <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/contact" component={Contact} />
                <Route path="/toggle-tutorials" component={ToggleTutorials} />
                <Route path="/terms-of-services" component={TermsOfServices} />
                <Redirect to="/dashboard" />
              </Switch>
            ) : (
              <Switch>
                <Route path="/admin/wimpie" component={OrderEstimate} />
                <Route path="/admin/price-sheet" component={PriceSheet} />
                <Redirect to="/admin/wimpie" />
              </Switch>
            )
          ) : (
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/admin/login" component={AdminLogin} />
              <Redirect from="/admin" to="/admin/login" />
              <Redirect exact from="/" to="/login" />
              <Redirect to="/login" />
            </Switch>
          )}
        </CustomLayout>
      </>
    )
  );
}

export default App;

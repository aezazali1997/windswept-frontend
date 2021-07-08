import { Login, ForgetPassword, Signup } from './pages/Auth';
import { OrderEstimate, Dashboard } from './pages';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

function App() {
  return (
    <>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path='/forget-password' component={ForgetPassword} />
        <Route path='/new-estimate' component={OrderEstimate} />
        <Route path='/dashboard' component={Dashboard} />

        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;

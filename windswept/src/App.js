import { Login, ForgetPassword, Signup } from './pages/Auth';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

function App() {
  return (
    <>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path='/forget-password' component={ForgetPassword} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;

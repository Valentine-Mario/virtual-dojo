import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Home from './components/home/home';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const Index = () => {
  return (
    <BrowserRouter>
      <div>
        <NavLink to="/" >Home</NavLink>
        <NavLink to="/login" >Login</NavLink>
        <NavLink to="/signup" >Signup</NavLink>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();

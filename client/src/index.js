import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Home from './components/home/home';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import PersistentDrawer from './components/drawer/drawer';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const Index = () => {
  return (
    <BrowserRouter>
        <PersistentDrawer />
    </BrowserRouter>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();

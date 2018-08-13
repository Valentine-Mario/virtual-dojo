import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './home.js'; 
import ContactUs from './contactUs';
import SignIn from './signIn';
import SignUp from './signUp';
import Categories from './categories';
// import CustomNavbar from './customNavBar';

class App extends Component {
  render() {
    return (
      
      <BrowserRouter>
          <div> 
            <Switch>
              {/* <CustomNavbar /> */}
                
                <Route exact path="/" component={Home} />
                <Route path="/categories" component={Categories} />
                <Route path="/contactUs" component={ContactUs} />
                <Route path="/signIn" component={SignIn} />
                <Route path="/signUp" component={SignUp} />
              </Switch> 
          </div> 
      </BrowserRouter>
      
    );
  }
}

export default App;

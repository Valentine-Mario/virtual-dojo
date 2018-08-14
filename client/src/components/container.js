import React from 'react';
import './container.css';
import MenuNav from './menu/menu';
import Footer from './menu/footer'
import { Switch, Route } from 'react-router-dom';
import SignIn from './signin/signIn';
import SignUp from './signup/signUp';
import Home from './home/home';
import Category from './category/category'

const Container = () => {
    return (
        <div>
            <MenuNav />
            <Switch>
                <Route path="/category" component={Category} />
                <Route path="/login" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route path="/" component={Home} />
            </Switch>
            <Footer />
        </div>
    )
}

export default Container;

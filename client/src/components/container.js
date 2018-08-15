import React, { Component } from 'react';
import './container.css';
import MenuNav from './menu/menu';
import Footer from './menu/footer'
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './signin/signIn';
import SignUp from './signup/signUp';
import Home from './home/home';
import Category from './category/category';
import User from './user/user';
import NotFound from './notFound';
import { Responsive } from 'semantic-ui-react';
import PrivateRoute from './privateRoute';


class Container extends Component {

    state = {
        authed: false
    }

    componentWillMount() {
        let storage = sessionStorage.getItem('user');
        if(storage) {
            this.setState({
                authed: true
            })
        }
    }

    render() {
        const authState = this.state.authed;
        return (
            <div>
                <Responsive>
                    <MenuNav />
                    <Switch>
                        <Route exact path="/category" component={Category} />
                        <Route exact path="/login" component={SignIn} />
                        <Route exact path="/signup" component={SignUp} />

                        <PrivateRoute authed={authState} path='/user' component={User} />

                        <Route exact path="/" component={Home} />
                        <Route component={NotFound} />
                    </Switch>
                    <Footer />
                </Responsive>
            </div>
        )
    }
}

export default Container;

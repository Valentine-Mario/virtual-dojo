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
import Course from './course/course';
import NotFound from './notFound';
import { Responsive } from 'semantic-ui-react';
import PrivateRoute from './privateRoute';


const SecureRender = (props) => {
    return sessionStorage.getItem('user') ? props.truthy : props.falsy
}

class Container extends Component {

    state = {
        authed: false
    }

    componentWillMount() {
        let storage = sessionStorage.getItem('user');
        
    }

    render() {

        let secureRender = sessionStorage.getItem('user') ? 
                    (<PrivateRoute authed={true} path='/auth/user' component={User} />)
                    :
                    (<PrivateRoute authed={false} path='/auth/user' component={User} />)

        
        return (
            <div>
                <Responsive>
                    <MenuNav />
                    <Switch>
                        <Route exact path="/category" component={Category} />
                        <Route exact path="/login" component={SignIn} />
                        <Route exact path="/signup" component={SignUp} />
                        <Route exact path="/auth/course" component={Course} />

                        {secureRender}

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

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
import AllCourses from './course/allCourses';
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

        let secureCourse = sessionStorage.getItem('user') ? 
                    (<PrivateRoute authed={true} path='/auth/course' component={AllCourses} />)
                    :
                    (<PrivateRoute authed={false} path='/auth/course' component={AllCourses} />)

        let secureCourseVideo = sessionStorage.getItem('user') ? 
                    (<PrivateRoute authed={true} path='/auth/course/:id' component={Course} />)
                    :
                    (<PrivateRoute authed={false} path='/auth/course/:id' component={Course} />)

        
        return (
            <div style={{fontFamily: 'Roboto'}}>
                <Responsive>
                    <MenuNav />
                    <Switch>
                        <Route exact path="/category" component={Category} />
                        <Route exact path="/login" component={SignIn} />
                        <Route exact path="/signup" component={SignUp} />
                        {secureCourseVideo}

                        {secureCourse}
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

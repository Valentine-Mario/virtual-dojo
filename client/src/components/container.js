import React, { Component } from 'react';
import './container.css';
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
import AdminLogin from './admin/adminLogin';
import AdminDashboard from './admin/dash/adminDashboard';


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
                    <Switch>
                        <Route path="/admin/dashboard" component={AdminDashboard} />
                        <Route path="/admin" component={AdminLogin} />
                        <Route path="/category" component={Category} />
                        <Route path="/login" component={SignIn} />
                        <Route path="/signup" component={SignUp} />
                        {secureCourseVideo}

                        {secureCourse}
                        {secureRender}

                        <Route exact path="/" component={Home} />
                        <Route component={NotFound} />
                    </Switch>
                </Responsive>
            </div>
        )
    }
}

export default Container;

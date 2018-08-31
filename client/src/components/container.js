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
import Video from './course/video';
import CategoryDetail from './category/categoryDetail';

import HandleAuth from './admin/handleAuth';

import ListCategories from './admin/courseCategories/listCategories';
import ListCourses from './admin/course/listCourse';
import CreateCategory from './admin/courseCategories/createCategory';
import CreateCourse from './admin/course/createCourse';
import UploadVideo from './admin/upload/upload';
import Users from './admin/user/user';


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

        let secureCourseVideo = sessionStorage.getItem('user') ? 
                    (<PrivateRoute authed={true} path='/auth/course/:id' component={Course} />)
                    :
                    (<PrivateRoute authed={false} path='/auth/course/:id' component={Course} />)

        let secureCourseDetail = sessionStorage.getItem('user') ? 
                    (<PrivateRoute authed={true} path='/auth/course/:id/:id_vid' component={Video} />)
                    :
                    (<PrivateRoute authed={false} path='/auth/course/:id/:id_vid' component={Video} />)

        
        return (
            <div style={{fontFamily: 'Roboto'}}>
                <Responsive>
                    <Switch>

                        <HandleAuth user={false} path='/admin/dashboard/upload_video' component={UploadVideo} />
                        <HandleAuth user={false} path='/admin/dashboard/create_course' component={CreateCourse} />
                        <HandleAuth user={false} path='/admin/dashboard/create_category' component={CreateCategory} />
                        <HandleAuth user={false} path='/admin/dashboard/user' component={Users} />
                        <HandleAuth user={false} path='/admin/dashboard/courses' component={ListCourses} />
                        <HandleAuth user={false} path='/admin/dashboard/categories' component={ListCategories} />

                        <HandleAuth user={false} path="/admin/dashboard" component={AdminDashboard} />
                        
                        <Route path="/admin" component={AdminLogin} />
                        <Route path="/category/:id" component={CategoryDetail} />
                        <Route path="/category" component={Category} />
                        <Route path="/login" component={SignIn} />
                        <Route path="/signup" component={SignUp} />

                        {secureCourseDetail}
                        {secureCourseVideo}

                        <Route path="/auth/course" component={AllCourses} />
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

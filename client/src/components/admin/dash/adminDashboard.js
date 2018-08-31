import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MainNav from '../menu/mainNav';
import SideNav from '../menu/sideNav';
import CreateCategory from '../courseCategories/createCategory';
import ListCategories from '../courseCategories/listCategories';
import ListCourses from '../course/listCourse';
import CreateCourse from '../course/createCourse';
import UploadVideo from '../upload/upload';

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <MainNav />
                <div style={{marginTop: '200px', marginLeft: '200px'}}>
                    hello this is dashboard
                </div>
                <SideNav />
            </div>
        )
    }
}

export default AdminDashboard;
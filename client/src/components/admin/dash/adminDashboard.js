import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MainNav from '../menu/mainNav';
import SideNav from '../menu/sideNav';
import CreateCategory from '../courseCategories/createCategory';
import ListCategories from '../courseCategories/listCategories';

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
            	<div>
            		<MainNav />
            		<Switch>
            			<Route path='/admin/dashboard/create_category' component={CreateCategory} />
            			<Route path='/admin/dashboard/categories' component={ListCategories} />
            		</Switch>
	            	<SideNav />
            	</div>
            </BrowserRouter>
        );
    }
}

export default AdminDashboard;

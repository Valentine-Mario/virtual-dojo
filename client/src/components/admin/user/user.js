import React, { Component } from 'react';
import MainNav from '../menu/mainNav';
import SideNav from '../menu/sideNav';

class Users extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div >
            	<MainNav />
            		<div style={{marginTop: '180px', marginLeft: '180px'}}>Hello</div>
            	<SideNav />
            </div>
        );
    }
}

export default Users;

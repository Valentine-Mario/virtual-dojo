import React, { Component } from 'react';
import MainNav from '../menu/mainNav';
import SideNav from '../menu/sideNav';

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        window.scrollTo(0, 0);
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
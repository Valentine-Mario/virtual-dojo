import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

class User extends Component {

    constructor(props) {
        super(props);
    }

    render() {

    	const container = {
    		marginTop: '75px'
    	}

        return (
            <div style={container}>
            	<h2>This is protected by us</h2>
            </div>
        );
    }
}

export default User;

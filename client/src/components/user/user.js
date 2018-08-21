import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

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
                <Header as="h1">Welcome to your Account...</Header>
            	<h2>This is protected by us</h2>
            </div>
        );
    }
}

export default User;

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';

class AdminLogin extends Component {

    constructor(props) {
        super(props);

        this.state = {
        	username: '',
        	password: ''
        }
    }

    handleChange = (e) => {
    	this.setState({
    		[e.target.name]: e.target.value
    	})
    }

    handleSubmit = (e) => {
    	e.preventDefault();

    	this.props.history.push("/admin/dashboard");
    }

    render() {

    	 const container = {
    	 	width: '500px',
    	 	margin: '200px auto'
    	 }

        return (
            <Form style={container} onSubmit={this.handleSubmit}>
			    <Form.Field>
			      <label>Username</label>
			      <input name="username" placeholder='Username' value={this.username} onChange={this.handleChange} />
			    </Form.Field>
			    <Form.Field>
			      <label>Password</label>
			      <input name="password" type="password" placeholder='Password' value={this.password} onChange={this.handleChange} />
			    </Form.Field>
			    <Button type='submit' invert primary>Login</Button>
		    </Form>
        );
    }
}

export default withRouter(AdminLogin);

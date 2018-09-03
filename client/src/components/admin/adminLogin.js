import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { REQ_POST } from '../../api';

class AdminLogin extends Component {

    constructor(props) {
        super(props);

        this.state = {
        	username: '',
        	password: '',
            loading: false
        }
    }

    handleChange = (e) => {
    	this.setState({
    		[e.target.name]: e.target.value
    	})
    }

    handleSubmit = (e) => {
    	e.preventDefault();
        this.setState({
            loading: true
        })

        let { username, password } = this.state;

        try {
            // statements
            REQ_POST('admin/login', { username: username.trim(), password })
                .then(res => {
                    if(res){
                        if(res.data){
                            console.log(res);
                            let user = [res.data.message.passport.user, res.data.isAdmin]
                            localStorage.setItem('user', JSON.stringify(user));

                            this.props.history.push("/admin/dashboard")

                            this.setState({
                                loading: false
                            })
                        } else {
                            alert('Error in network connection, try again');
                            this.setState({
                                loading: false
                            })
                        }
                    }else {
                        alert('Error in network connection, try again');
                    }
                })
        } catch(e) {
            // statements
            console.log(e);
        }

    }

    render() {
        let { loading } = this.state;
        const admin = JSON.parse(localStorage.getItem('user'));

    	 const container = {
    	 	width: '500px',
    	 	margin: '200px auto'
    	 }

         const Render = admin && admin[1] == 1 ?
                            (<Redirect to="/admin/dashboard" />)
                            :
                            (
                                <Form style={container} onSubmit={this.handleSubmit} loading={loading}>
                    			    <Form.Field>
                    			      <label>Username</label>
                    			      <input name="username" placeholder='Username' value={this.username} onChange={this.handleChange} />
                    			    </Form.Field>
                    			    <Form.Field>
                    			      <label>Password</label>
                    			      <input name="password" type="password" placeholder='Password' value={this.password} onChange={this.handleChange} />
                    			    </Form.Field>
                    			    <Button type='submit' inverted primary>Login</Button>
                    		    </Form>
                            )

        return (
            <div>
                {
                    Render
                }
            </div>
        );
    }
}

export default withRouter(AdminLogin);

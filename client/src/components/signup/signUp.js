/* import React, {Component} from 'react'
import { Button, Form, Input } from 'semantic-ui-react'

class SignIn extends Component {
    render() {
        return (
            <Form style={{width: '90%', margin: 'auto', marginTop: '20px'}} >
                <Form.Group widths='equal' >
                    <Form.Field
                        id='form-input-control-first-name'
                        control={Input}
                        placeholder='First name'
                    />
                    <Form.Field
                        id='form-input-control-last-name'
                        control={Input}
                        placeholder='Last name'
                    />
                </Form.Group>
                <Form.Field
                    id='form-input-control-username'
                    control={Input}
                    placeholder='Username'
                />
                <Form.Group widths='equal'  >
                    <Form.Field
                        id='form-input-control-password'
                        control={Input}
                        placeholder='Password'
                        type="password"
                    />
                    <Form.Field
                        id='form-input-control-confirm-password'
                        control={Input}
                        placeholder='Confirm Password'
                        type="password"
                    />
                </Form.Group>
                <Form.Field
                    id='form-button-control-public'
                    control={Button}
                    content='Sign Up'
                    color="blue"
                    style={{width: '100%'}}
                />
            </Form>
        )
    }
}

export default SignIn; */

import React, { PureComponent } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Button, Form, Input, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { REG_REQ } from '../../api'

class SignUp extends PureComponent {

    constructor(props){
        super(props);
        
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            errors: {},
            user: {}
        };
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let { firstName, lastName, email, username, password, confirmPassword, errors, user} = this.state;
        
        
        if(/^([a-z0-9-_.]+\@[a-z0-9-.]+\.[a-z]{2,4})$/g.test(email)){
            console.log(email)

            if(password === confirmPassword){
                /**HANDLE REQUEST TO SIGN UP */

                let user = { firstName, lastName, email, username, password, confirmPassword };
                
                REG_REQ('users/register', user)
                    .then(res => {
                        console.log(res);
                    })
                
            }else {
                errors.password = "password does not match";
                console.log('password does not match', errors);
                
            }
        }else {
            errors.email = "Invalid email format";
            console.log('invalid email format', errors);
        }

    }
    


    render() {
        const container = {
            width: '500px',
            margin: 'auto',
            paddingTop: '150px',
            height: '600px'
        };

        const btn = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        };

        const formContainer = {
            width: '90%', 
            margin: 'auto', 
            marginTop: '20px',
            marginBottom: '20px'
        };
        
        const menu = {
            width: '50%'
        };

        return (
            <div style={container} >
                <Menu attached='top' tabular>
                    <Menu.Item 
                        style={menu}
                        name='Log In' 
                        as={Link}
                        to="/login"
                    />
                    <Menu.Item
                        style={menu}
                        name='Sign Up'
                        active={true}
                        as={Link}
                        to="/signup"
                    />
                </Menu>

                <Segment attached='bottom'>
                    <Form style={formContainer} onSubmit={this.handleSubmit} >
                        <Form.Field
                            id='firstName'
                            control={Input}
                            placeholder='First name'
                            onChange={this.handleChange}
                            required
                        />
                        <Form.Field
                            id='lastName'
                            control={Input}
                            placeholder='Last name'
                            onChange={this.handleChange}
                            required
                        />
                        <Form.Field
                            id='email'
                            control={Input}
                            placeholder='Email'
                            type="email"
                            onChange={this.handleChange}
                            required
                        />
                        <Form.Field
                            id='username'
                            control={Input}
                            placeholder='Username'
                            onChange={this.handleChange}
                            required
                        />
                        <Form.Group widths='equal'  >
                            <Form.Field
                                id='password'
                                control={Input}
                                placeholder='Password'
                                type="password"
                                onChange={this.handleChange}
                                required
                            />
                            <Form.Field
                                id='confirmPassword'
                                control={Input}
                                placeholder='Confirm Password'
                                type="password"
                                onChange={this.handleChange}
                                required
                            />
                        </Form.Group>
                        <Button basic color='blue' style={btn} animated='vertical'>
                            <Button.Content hidden>
                                Sign Up
                            </Button.Content>
                            <Button.Content visible>
                                <Icon name='signup' />
                            </Button.Content>
                        </Button>
                    </Form>
                </Segment>
            </div>
        )
    }
}

export default SignUp;
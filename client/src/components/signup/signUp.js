import React, { PureComponent } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Button, Form, Input, Icon, Responsive } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { REQ_POST } from '../../api';

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
            loading: false,
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
        this.setState({
            loading: true
        })
        
        
        if(/^([a-z0-9-_.]+\@[a-z0-9-.]+\.[a-z]{2,4})$/g.test(email)){
            console.log(email)

            if(password === confirmPassword){
                /**HANDLE REQUEST TO SIGN UP */

                let user = { firstName, lastName, email, username, password, confirmPassword };
                
                REQ_POST('users/register', user)
                    .then(res => {
                        console.log(res);
                        this.setState({
                            firstName: '',
                            lastName: '',
                            email: '',
                            username: '',
                            password: '',
                            confirmPassword: '',
                            loading: false
                        })
                    })

                    /*axios.post(`https://virtualserver.herokuapp.com/users/register`, user)
                        .then(res => {
                            console.log(res)
                        })
                        .catch(err => {
                            console.log(err)
                        })*/
                
            }else {
                errors.password = "password does not match";
                console.log('password does not match', errors);
                this.setState({
                    password: '',
                    confirmPassword: '',
                    loading: false
                })
                
            }
        }else {
            errors.email = "Invalid email format";
            console.log('invalid email format', errors);
            this.setState({
                email: '',
                password: '',
                confirmPassword: '',
                loading: false
            })
        }

    }
    


    render() {
        let { firstName, lastName, email, username, password, confirmPassword, loading } = this.state;

        const container = {
            width: '500px',
            margin: 'auto',
            paddingTop: '150px',
            height: '600px'
        };

        const containerMobile = {
          width: '350px',
          margin: 'auto',
          paddingTop: '120px',
          height: '600px'
        }

        const btn = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            zIndex: '0'
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
            <div>
                <Responsive minWidth={Responsive.onlyTablet.minWidth} style={container} >
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
                        <Form style={formContainer} onSubmit={this.handleSubmit} loading={loading} >
                            <Form.Field
                                id='firstName'
                                control={Input}
                                placeholder='First name'
                                onChange={this.handleChange}
                                required
                                value={firstName}
                            />
                            <Form.Field
                                id='lastName'
                                control={Input}
                                placeholder='Last name'
                                onChange={this.handleChange}
                                required
                                value={lastName}
                            />
                            <Form.Field
                                id='email'
                                control={Input}
                                placeholder='Email'
                                type="email"
                                onChange={this.handleChange}
                                required
                                value={email}
                            />
                            <Form.Field
                                id='username'
                                control={Input}
                                placeholder='Username'
                                onChange={this.handleChange}
                                required
                                value={username}
                            />
                            <Form.Group widths='equal'  >
                                <Form.Field
                                    id='password'
                                    control={Input}
                                    placeholder='Password'
                                    type="password"
                                    onChange={this.handleChange}
                                    required
                                    value={password}
                                />
                                <Form.Field
                                    id='confirmPassword'
                                    control={Input}
                                    placeholder='Confirm Password'
                                    type="password"
                                    onChange={this.handleChange}
                                    required
                                    value={confirmPassword}
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
                </Responsive >
                <Responsive style={containerMobile} maxWidth={Responsive.onlyMobile.maxWidth} >
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
                        <Form style={formContainer} onSubmit={this.handleSubmit} loading={loading} >
                            <Form.Field
                                id='firstName'
                                control={Input}
                                placeholder='First name'
                                onChange={this.handleChange}
                                required
                                value={firstName}
                            />
                            <Form.Field
                                id='lastName'
                                control={Input}
                                placeholder='Last name'
                                onChange={this.handleChange}
                                required
                                value={lastName}
                            />
                            <Form.Field
                                id='email'
                                control={Input}
                                placeholder='Email'
                                type="email"
                                onChange={this.handleChange}
                                required
                                value={email}
                            />
                            <Form.Field
                                id='username'
                                control={Input}
                                placeholder='Username'
                                onChange={this.handleChange}
                                required
                                value={username}
                            />
                            <Form.Group widths='equal'  >
                                <Form.Field
                                    id='password'
                                    control={Input}
                                    placeholder='Password'
                                    type="password"
                                    onChange={this.handleChange}
                                    required
                                    value={password}
                                />
                                <Form.Field
                                    id='confirmPassword'
                                    control={Input}
                                    placeholder='Confirm Password'
                                    type="password"
                                    onChange={this.handleChange}
                                    required
                                    value={confirmPassword}
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
                </Responsive >
            </div>
        )
    }
}

export default SignUp;
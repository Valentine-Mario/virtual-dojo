import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Button, Form, Input, Icon, Responsive, Message } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import { REQ_POST } from '../../api';
import { isLoggedIn } from '../../config';

class SignUp extends Component {

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
            user: {},
            visible: true
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
                        if(res.data.code == 1) {
                            errors.newUser = "Email or Username already in use";
                            this.setState({
                                visible: false
                            })
                        }else {
                            
                            /** HANDLE ALL ROUTING WHEN USER REGISERS SUCCESSFULLY*/
                            sessionStorage.setItem('user', res.data.user);
                            this.props.history.push("/auth/user");
                        }

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

    /**   HANDLE ERROR MESSAGE FOR LOGIN   */
      handleDismiss = () => {
        this.setState({ visible: true })
      }
    


    render() {
        let { firstName, lastName, email, username, password, confirmPassword, loading, errors, visible } = this.state;

        if(isLoggedIn('user')){
          this.props.history.push('/auth/user');
        }

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
                    {
                      errors && (
                        <Message hidden={visible} negative onDismiss={this.handleDismiss}>
                          <Message.Header>We're sorry you can't register this account</Message.Header>
                          <p>{errors.newUser}</p>
                        </Message>
                      )
                    }
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
                                focus
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
                                error={errors.email}
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
                                    error={errors.password}
                                />
                                <Form.Field
                                    id='confirmPassword'
                                    control={Input}
                                    placeholder='Confirm Password'
                                    type="password"
                                    onChange={this.handleChange}
                                    required
                                    value={confirmPassword}
                                    error={errors.password}
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
                    {
                      errors && (
                        <Message hidden={visible} negative onDismiss={this.handleDismiss}>
                          <Message.Header>We're sorry you can't register this account</Message.Header>
                          <p>{errors.newUser}</p>
                        </Message>
                      )
                    }
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
                                error={errors.email}
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
                                    error={errors.password}
                                />
                                <Form.Field
                                    id='confirmPassword'
                                    control={Input}
                                    placeholder='Confirm Password'
                                    type="password"
                                    onChange={this.handleChange}
                                    required
                                    value={confirmPassword}
                                    error={errors.password}
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

export default withRouter(SignUp);
import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Button, Form, Input, Icon, Responsive, Message } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import { REQ_POST } from '../../api';
import { isLoggedIn } from '../../config';
import MenuNav from '../menu/menu';
import Footer from '../menu/footer';

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
            

            if(username.length >= 3 && username.length <= 15){
                if(password.length >= 6){
                    if(password === confirmPassword){
                        /**HANDLE REQUEST TO SIGN UP */

                        let user = { firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim(), username: username.trim(), password, confirmPassword };
                        
                        REQ_POST('users/register', user)
                            .then(res => {

                                if(res.data){
                                    if(res.data.code == 1) {
                                        errors.message = "Email or Username already in use";
                                        this.setState({
                                            visible: false
                                        })
                                    }else {
                                        
                                        /** HANDLE ALL ROUTING WHEN USER REGISERS SUCCESSFULLY
                                        **/

                                        let user = [res.data.user, res.data.isAdmin];
                                        localStorage.setItem('user', JSON.stringify(user));

                                        this.props.history.push("/auth/user");
                                    }
                                }else {
                                    console.log('Error occured now');
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

                        errors.message = "password does not match";

                        

                        this.setState({
                            password: '',
                            confirmPassword: '',
                            loading: false,
                            visible: false
                        })
                        
                    }
                }else {
                    
                    errors.message = 'Minimum length for password is 6 characters';

                    this.setState({
                        password: '',
                        confirmPassword: '',
                        loading: false,
                        visible: false
                    })
                }
            }else {
                
                errors.message = 'Minimum length for username is 3 and maximum is 15';

                this.setState({
                    password: '',
                    confirmPassword: '',
                    username: '',
                    loading: false,
                    visible: false
                })
            }

        }else {
            errors.message = "Invalid email format";

            

            this.setState({
                email: '',
                password: '',
                confirmPassword: '',
                loading: false,
                visible: false
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
                <MenuNav />
                <Responsive minWidth={Responsive.onlyTablet.minWidth} style={container} >
                    {
                      errors && (
                        <Message hidden={visible} negative onDismiss={this.handleDismiss}>
                          <Message.Header>We're sorry you can't register this account</Message.Header>
                          <p>{errors.message}</p>
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
                    {
                      errors && (
                        <Message hidden={visible} negative onDismiss={this.handleDismiss}>
                          <Message.Header>We're sorry you can't register this account</Message.Header>
                          <p>{errors.message}</p>
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
                <Footer />
            </div>
        )
    }
}

export default withRouter(SignUp);
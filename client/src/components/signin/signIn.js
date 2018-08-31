import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Button, Form, Icon, Responsive, Input, Message } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import { REQ_POST } from '../../api';
import axios from 'axios';
import { isLoggedIn } from '../../config';
import MenuNav from '../menu/menu';
import Footer from '../menu/footer';

class SignIn extends Component {
    constructor(props){
      super(props);
  
      this.state = {
        username: '',
        password: '',
        user: {},
        activeItem: 'Log In',
        loading: false,
        visible: true,
        loggedIn: false
      }
    }
    
      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });

      };
    
      handleSubmit = (e) => {
        e.preventDefault();

        const { username, password, user } = this.state;

        let trimUsername = username.trim();

        this.setState({
          loading: true
        })
    

        /**MAKE A REQUEST TO THE SERVER */
    
        if(username.trim() == '' || password.trim() == ''){
          console.log('username or password is required');
        }else {

            /**REVIEW THIS TO HANDLE EVERY LOGIN REQUEST */

            REQ_POST(`users/login`, {username: username.trim(),password})
            .then(res => {

              //ONLY USE RES FOR SUCCESS AND RES.RESPONSE FOR ERROR HANDLING
                if(res.response){
                  this.setState({
                    error: 'Please register an account or use valid details to login',
                    visible: false
                  })
                }else if(res.data){
                  let user = [res.data.message.passport.user, res.data.isAdmin];
                  sessionStorage.setItem('user', JSON.stringify(user));

                  this.setState({
                    loggedIn: true
                  });

                  this.props.history.push("/auth/user");
                }


                this.setState({
                  username: '',
                  password: '',
                  loading: false
                })
            })

        }
      }

      /**   HANDLE ERROR MESSAGE FOR LOGIN   */
      handleDismiss = () => {
        this.setState({ visible: true })
      }

    render() {
        const { activeItem, username, password, loading, error, visible } = this.state;

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
          paddingTop: '150px',
          height: '600px'
        }
        const menu = {
            width: '50%'
        };

        const btn = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            zIndex: '0'
        };

        const formContainer = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
            marginBottom: '20px'
        }


        return (
            <div>
              <MenuNav />
              <Responsive style={container}  minWidth={Responsive.onlyTablet.minWidth}>
                {
                  error && (
                    <Message hidden={visible} negative onDismiss={this.handleDismiss}>
                      <Message.Header>Sorry, you can't log in with this account</Message.Header>
                      <p>{error}</p>
                    </Message>
                  )
                }
                <Menu attached='top' tabular>
                    <Menu.Item 
                        style={menu}
                        name='Log In' 
                        active={activeItem === 'Log In'} 
                        as={Link}
                        to="/login"
                    />
                    <Menu.Item
                        style={menu}
                        name='Sign Up'
                        active={activeItem === 'Sign Up'}
                        as={Link}
                        to="/signup"
                    />
                </Menu>

                <Segment attached='bottom'>
                    <Form loading={loading} style={formContainer} onSubmit={this.handleSubmit} >
                        <Form.Field style={{width: '90%'}} >
                            <Input id="username" placeholder='Username' onChange={this.handleChange} value={username} required />
                        </Form.Field>
                        <Form.Field style={{width: '90%'}} >
                            <Input id="password" placeholder='Password' type="password" onChange={this.handleChange} value={password} required />
                        </Form.Field>

                        <Button basic color='blue' style={btn} animated='vertical'  >
                          <Button.Content hidden>
                              Log In
                          </Button.Content>
                          <Button.Content visible>
                              <Icon name='sign in' />
                          </Button.Content>
                        </Button>

                    </Form>
                </Segment>
              </Responsive>
              <Responsive style={containerMobile} {...Responsive.onlyMobile} >
                {
                  error && (
                    <Message hidden={visible} negative onDismiss={this.handleDismiss}>
                      <Message.Header>We're sorry you can't log in with this account</Message.Header>
                      <p>{error}</p>
                    </Message>
                  )
                }
                <Menu attached='top' tabular>
                    <Menu.Item 
                        style={menu}
                        name='Log In' 
                        active={activeItem === 'Log In'} 
                        as={Link}
                        to="/login"
                    />
                    <Menu.Item
                        style={menu}
                        name='Sign Up'
                        active={activeItem === 'Sign Up'}
                        as={Link}
                        to="/signup"
                    />
                </Menu>

                <Segment attached='bottom'>
                    <Form loading={loading} style={formContainer} onSubmit={this.handleSubmit} >
                        <Form.Field style={{width: '90%'}} >
                            <Input id="username" placeholder='Username' onChange={this.handleChange} value={username} required />
                        </Form.Field>
                        <Form.Field style={{width: '90%'}} >
                            <Input id="password" placeholder='Password' type="password" onChange={this.handleChange} value={password} required />
                        </Form.Field>

                        <Button basic color='blue' style={btn} animated='vertical'  >
                          <Button.Content hidden>
                              Log In
                          </Button.Content>
                          <Button.Content visible>
                              <Icon name='sign in' />
                          </Button.Content>
                        </Button>

                    </Form>
                </Segment>
            </Responsive>
            <Footer />
          </div>
        )
    }
}

export default withRouter(SignIn);
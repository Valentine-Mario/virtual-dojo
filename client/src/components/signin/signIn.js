import React, { PureComponent } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Button, Form, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { REQ_POST } from '../../api';
import axios from 'axios';

class SignIn extends PureComponent {
    constructor(props){
        super(props);
    
        this.state = {
          username: '',
          password: '',
          user: {},
          activeItem: 'Log In',
          loading: false
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
        this.setState({
          loading: true
        })
    
        /**MAKE A REQUEST TO THE SERVER */
    
        if(username == '' || password == ''){

          console.log('please input value');

        }else {

            /**REVIEW THIS TO HANDLE EVERY LOGIN REQUEST */

          /*axios.post(`https://virtualserver.herokuapp.com/users/login`, {username,password})
            .then(res => {
                console.log(res);
                this.setState({
                  username: '',
                  password: '',
                  loading: false
                })
            })
            .catch(err => {
                console.log(err)
            })*/

            REQ_POST(`users/login`, {username,password})
            .then(res => {
              //ONLY USE RES FOR SUCCESS AND RES.RESPONSE FOR ERROR HANDLING
                console.log(res);
                this.setState({
                  username: '',
                  password: '',
                  loading: false
                })
            })

        }
      }
    
      handleLogin = (user) => {
        if(user.username !== undefined){
          console.log('welcome ', this.state.user);
    
          /**RESET THE LOCAL STATE */
          this.setState({
            username: '',
            password: '',
            user: {}
          })
    
          /**HANDLE ALL VERIFICATION AND SEND REAL USERS TO SECURE DASHBOARD */
          
        }else {
          console.log('invalid ', this.state.user)
        }
      }

    render() {
        const { activeItem, username, password, loading } = this.state;
        const container = {
            width: '500px',
            margin: 'auto',
            paddingTop: '150px',
            height: '600px'
        };
        const menu = {
            width: '50%'
        };

        const btn = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%'
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
            <div style={container} >
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
                            <input id="username" placeholder='Username' onChange={this.handleChange} value={username} required />
                        </Form.Field>
                        <Form.Field style={{width: '90%'}} >
                            <input id="password" placeholder='Password' type="password" onChange={this.handleChange} value={password} required />
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
            </div>
        )
    }
}

export default SignIn;
/* import React, {Component} from 'react'
import { Button, Form } from 'semantic-ui-react'

class SignUp extends Component {


    render() {

        const container = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
            marginBottom: '20px'
        }

        return (
            <Form style={container}>
                <Form.Field style={{width: '90%'}} >
                    <input placeholder='Username' />
                </Form.Field>
                <Form.Field style={{width: '90%'}} >
                    <input placeholder='Password' type="password" />
                </Form.Field>
                <Button style={{width: '90%'}} color="blue" type='submit'>Log In</Button>
            </Form>
        )
    }
}

export default SignUp; */

import React, { PureComponent } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Button, Form, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { fetchGet } from '../../api';
import axios from 'axios';

class SignIn extends PureComponent {
    constructor(props){
        super(props);
    
        this.state = {
          username: '',
          password: '',
          user: {},
          activeItem: 'Log In' 
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
    
        /**MAKE A REQUEST TO THE SERVER */
    
        if(username == '' || password == ''){
          console.log('please input value');
        }else {

            /**REVIEW THIS TO HANDLE EVERY LOGIN REQUEST */
          /*fetchGet('account')
          .then(data => {
            data.filter(user => {
              if(user.username == username && user.password == password){
                this.setState({
                  username: '',
                  password: '',
                  user
                })
                return true;
              }
            })
    
            this.handleLogin(this.state.user);
    
          }).catch(err => {
            console.log(err)
          })*/

          axios.post('https://ogene.herokuapp.com/users/login', {email: username, password: password})
                        .then(res => {
                            console.log(res)
                        })
                        .then(err => {
                            console.log(err)
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
        const { activeItem } = this.state;
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
                    <Form style={formContainer} onSubmit={this.handleSubmit} >
                        <Form.Field style={{width: '90%'}} >
                            <input id="username" placeholder='Username' onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field style={{width: '90%'}} >
                            <input id="password" placeholder='Password' type="password" onChange={this.handleChange} />
                        </Form.Field>

                        <Button basic color='blue' style={btn} animated='vertical' >
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
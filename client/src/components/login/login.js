// import React, { Component } from 'react'

// export class Login extends Component {

//   constructor(){
//     super();

//     this.state = {
//       username: '',
//       password: ''
//     }
//   }

//   handleChange = (e) => {
//     this.setState({
//       [e.target.id]: e.target.value
//     })
//   }

//   handleClick = (e) => {
//     e.preventDefault();
//     console.log(this.state.username, this.state.password)
//   }

//   render() {
//     const { username, password } = this.state;

//     return (
//       <div>
//         <form>
//           <label htmlFor="username" >Username</label>
//           <input type="text" value={username} id="username" placeholder="example" onChange={this.handleChange} /><br />

//           <label htmlFor="password" >Password</label>
//           <input type="password" value={password} id="password" onChange={this.handleChange} /><br />

//           <button onClick={this.handleClick} >Login</button>
//         </form>
//       </div>
//     )
//   }
// }

// export default Login



import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { API_URL } from '../../config';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginTop: theme.spacing.unit * 10
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  button: {
    margin: theme.spacing.unit,
  }
});

class Login extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      user: {}
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    fetch(`${API_URL}/account`)
      .then(res => res.json())
      .then(data => {
        data.filter(user => {
          // return user.username == username;
          if(user.username == username && user.password == password){
            this.setState({
              username: '',
              password: '',
              user
            })
            return true;
          }
        })

        
        this.handleLogin(this.state.user)

      }).catch(err => {
        console.log(err)
      })
  }

  handleLogin = (user) => {
    if(user == true){
      console.log('welcome ', this.state.user)

      /**HANDLE ALL VERIFICATION AND SEND REAL USERS TO SECURE DASHBOARD */
      
    }else {
      console.log('invalid ', this.state.user)
    }
  }

  render() {
    const { classes } = this.props;
    const { username, password } = this.state;

    return (
      <form className={classes.container} onSubmit={this.handleSubmit} >
        <TextField
          id="username"
          label="Username"
          className={classes.textField}
          value={username}
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
          id="password"
          label="Password"
          className={classes.textField}
          value={password}
          type="password"
          onChange={this.handleChange}
          margin="normal"
        />

        <Button variant="contained" color="primary" className={classes.button} type="submit" >
          Login
        </Button>
      </form>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
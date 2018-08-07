// import React, { Component } from 'react'

// export class Signup extends Component {
//   constructor(){
//     super();

//     this.state = {
//         name: '',
//         username: '',
//         email: '',
//         password: '',
//         passwordConfirm: ''
//     }
//   }

//   handleChange = (e) => {
//     this.setState({
//         [e.target.id]: e.target.value
//     });
//   }

//   handleClick = (e) => {
//     e.preventDefault();
//     console.log(this.state)
//   }

//   render() {
//     const { name, username, email, password, passwordConfirm } = this.state;

//     return (
//       <div>
//         <form>
//           <label htmlFor="name" >Name</label>
//           <input type="text" value={name} id="name" placeholder="example" onChange={this.handleChange} /><br />

//           <label htmlFor="username" >Username</label>
//           <input type="text" value={username} id="username" onChange={this.handleChange} /><br />

//           <label htmlFor="email" >Email</label>
//           <input type="email" value={email} id="email" onChange={this.handleChange} /><br />

//           <label htmlFor="password" >Password</label>
//           <input type="password" value={password} id="password" onChange={this.handleChange} /><br />

//           <label htmlFor="passwordConfirm" >Confirm Password</label>
//           <input type="password" value={passwordConfirm} id="passwordConfirm" onChange={this.handleChange} /><br />

//           <button onClick={this.handleClick} >Login</button>
//         </form>
//       </div>
//     )
//   }
// }

// export default Signup


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
    marginTop: theme.spacing.unit * 8,
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

class Signup extends React.Component {
  state = {
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let user = {...this.state}
    console.log(user);

    /** RUN ALL THE REQUIRED VALIDATION HERE
     * BEFORE POSTING TO THE SERVER FOR VERIFICATION AND AUTHENTIFICATION
     */

    fetch(`${API_URL}/account`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }

  render() {
    const { classes } = this.props;
    const { name, username, email, password, passwordConfirm } = this.state;

    return (
      <form className={classes.container} onSubmit={this.handleSubmit} >
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={name}
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
          id="username"
          label="Username"
          className={classes.textField}
          value={username}
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          value={email}
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
          id="password"
          label="Password"
          className={classes.textField}
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
          id="passwordConfirm"
          label="Confirm password"
          className={classes.textField}
          type="password"
          value={passwordConfirm}
          autoComplete="current-password"
          onChange={this.handleChange}
          margin="normal"
        />

        <Button variant="contained" color="primary" className={classes.button} type="submit" >
          Signup
        </Button>
      </form>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);
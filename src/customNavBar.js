import React from 'react';
import './customNavBar.css';
// import {Navbar, Nav, NavItem} from 'react-bootstrap';
// import { BrowserRouter as Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
 } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
     
        <Navbar expand="md">
          
          <NavbarToggler onClick={this.toggle} />
          {/* <div> */}
           
            <input className="search" value="search courses "/>
            <ion-icon name="searchIcon"></ion-icon>

         {/* </div>  */}
        
        <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            
              <NavItem>
                <NavLink href="/categories/"><strong>Categories</strong></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/contactUs"><strong>Contact us</strong></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signIn/"><strong>Sign in</strong></NavLink>
              </NavItem>
              <button className="signUp">Sign up</button>
              {/* <Button  href="/signUp/" bsStyle="danger" bsSize="small" className="buttton">   
               <strong> Sign up</strong> 
              </Button>  */}
          </Nav>
          
          </Collapse>
      </Navbar> 
  </div>
    
    );
  }
}




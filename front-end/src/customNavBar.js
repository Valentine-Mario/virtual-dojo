import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { InputGroup, Button, Input } from 'reactstrap';
import './customNavBar.css'; 
import {Link} from 'react-router-dom';


export default class CustomNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div className="body">
     <Nav pills>
         

        <InputGroup style={{ width: '590px', paddingLeft: '220px', }}>
                
                <Input style={{backgroundColor: "rgba(255, 255, 255, 0.7)"}} 
                placeholder= "search courses"/> 
                
          </InputGroup> 

                <NavItem style={{marginTop:'8px', marginLeft: "8px"}}> 
                    <Link to="/categories">Categories</Link>
                  </NavItem>
               <NavItem>
                    <NavLink href="#">Contact us</NavLink>
                  </NavItem>
                  <NavItem  style={{marginTop:'8px'}}> 
                    <Link to="/signIn">Sign In</Link>
                  </NavItem>
                
                 <Button outline color="primary" style={{ backgroundColor: 'white', position: "absolute",
                  top: "5px", right: "90px", borderWidth: '1.5px', borderRadius:"10px"}}><Link to="/signUp">Sign Up</Link>
                 </Button> 
              </Nav>
                
      </div>
    );
  }
}




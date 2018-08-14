import React from 'react';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import './customNavBar.css'; 
// import logo from './logo.jpg';
// import { Button } from 'reactstrap';


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
         

        <InputGroup style={{ width: '590px', paddingLeft: '220px'}}> 
                <Input/>
                <InputGroupAddon addonType="append">
                  <Button color="primary">Submit</Button>
                </InputGroupAddon>
              </InputGroup> 
        
                <NavItem >
                  <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                    <DropdownToggle nav caret>
                      Categories
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>Professional</DropdownItem>
                      <DropdownItem>Formal basic</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Job Oppurtunities</DropdownItem>
                    </DropdownMenu>
                  </Dropdown></NavItem>

                  <NavItem>
                    <NavLink href="#">Contact us</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">Sign In</NavLink>
                  </NavItem>

                 <Button outline color="primary" style={{color:'blue', backgroundColor: 'white',
                 borderWidth: '1px'}}>Sign Up</Button>{' '}
                </Nav>
      </div>
    );
  }
}




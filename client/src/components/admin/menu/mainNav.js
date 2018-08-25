import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const MainNav = (props) => {
  return (
    <Segment style={{position: 'fixed', top: '0px', zIndex: '10', width: '100%', borderRadius: '0', height: '80px', background: '#358fb6'}}>
        <Menu inverted secondary as={NavLink} to="/admin/dashboard">
          <Menu.Item
            name='Admin'
            position="right"
          />
        </Menu>
	</Segment>
  )
}

export default MainNav;
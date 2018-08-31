import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const handleLogout = (props) => {
  localStorage.clear('user');
  props.history.push('/admin');
}

const MainNav = (props) => {
  return (
    <Segment style={{position: 'fixed', top: '0px', zIndex: '10', width: '100%', borderRadius: '0', height: '80px', background: '#358fb6'}}>
        <Menu inverted secondary >
          <Menu.Item
            name='Logout'
            position="right"
            onClick={() => handleLogout(props)}
          />
        </Menu>
	</Segment>
  )
}

export default withRouter(MainNav);
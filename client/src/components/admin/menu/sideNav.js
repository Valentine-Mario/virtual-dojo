import React, { Component } from 'react';
import { Menu, Sidebar, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const SideNav = (props) => {
  return (
        <Sidebar as={Menu} icon='labeled' vertical visible style={{position: 'fixed', height: '100%', left: '0', top: '80px', width: '150px'}}>
	      <Menu.Item active as={NavLink} to="/admin/dashboard">
	        <Icon name='home' />
	        Dashboard
	      </Menu.Item>
	      <Menu.Item active as={NavLink} to="/admin/dashboard/user">
	        <Icon name='user' />
	        Users
	      </Menu.Item>
	      <Menu.Item active as={NavLink} to="/admin/dashboard/courses">
	        <Icon name='book' />
	        Course
	      </Menu.Item>
	      <Menu.Item active as={NavLink} to="/admin/dashboard/upload_video">
	        <Icon name='upload' />
	        Upload
	      </Menu.Item>
	      <Menu.Item active as={NavLink} to="/admin/dashboard/categories">
	        <Icon name='clipboard' />
	        Course Categories
	      </Menu.Item>
	    </Sidebar>
    );
}

export default SideNav;
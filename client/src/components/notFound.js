import React from 'react';
import { Link } from 'react-router-dom';
import MenuNav from './menu/menu';
import Footer from './menu/footer';
import { Button } from 'semantic-ui-react';

const NotFound = (props) => {
	const container = {
		marginTop: '85px',
		marginLeft: '20px'
	}
  return (
  	<div>
	  	<MenuNav />
	    <div style={container}>
	    	<h2>Page Not Found</h2>
	    	<Button as={Link} to="/" inverted color="blue">Go Home </Button>
	    </div>
	    <Footer />
  	</div>
  )
}

export default NotFound;
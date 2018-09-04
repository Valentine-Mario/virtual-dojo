import React from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { REQ_GET } from '../../api';


function HandleAuth ({component: Component, user, ...rest}) {

	let isAdmin = JSON.parse(localStorage.getItem('user'));
	if(isAdmin){
		if(isAdmin[1] == 1){
			user = true;
		}
	}

	return (
			<Route
		        {...rest}
		        render={props =>
		          user ? (
		            <Component {...props} />
		          ) : (
		            <Redirect
		              to={{
		                pathname: "/admin",
		                state: { from: props.location }
		              }}
		            />
		          )
		        }
		    />
		)
}

export default withRouter(HandleAuth);
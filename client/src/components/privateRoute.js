import React from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';


function PrivateRoute ({component: Component, user, ...rest}) {

  let isUser = JSON.parse(sessionStorage.getItem('user'));
  if(isUser){
      user = true;
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
                    pathname: "/login",
                    state: { from: props.location }
                  }}
                />
              )
            }
        />
    )
}

export default withRouter(PrivateRoute);
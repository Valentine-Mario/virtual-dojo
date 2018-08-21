import React from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';


function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
        {...rest}
        render={props =>
          authed ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
    />
  )
}

export default withRouter(PrivateRoute);
import React, { Component } from 'react';
import './container.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from './notFound';
import { Responsive } from 'semantic-ui-react';
import Upload from './admin/upload/upload';


const SecureRender = (props) => {
    return sessionStorage.getItem('user') ? props.truthy : props.falsy
}

class Container extends Component {

    state = {
        authed: false
    }

    componentWillMount() {
        let storage = sessionStorage.getItem('user');
        
    }

    render() {
        
        return (
            <div style={{fontFamily: 'Roboto'}}>
                <Responsive>
                    <Switch>
                        <Route exact path="/upload" component={Upload} />
                        <Route component={NotFound} />
                    </Switch>
                </Responsive>
            </div>
        )
    }
}

export default Container;

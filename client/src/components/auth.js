import React, { PureComponent } from 'react'
import { Menu, Segment } from 'semantic-ui-react'

class Auth extends PureComponent {
    state = { 
      activeItem: 'Log In' 
    }

    render() {
        const { activeItem } = this.state;
        const container = {
            width: '500px',
            margin: 'auto',
            paddingTop: '150px',
            height: '600px'
        };

        return (
            <div style={container} >
                Auth
            </div>
        )
    }
}

export default Auth;
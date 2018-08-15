import React, {PureComponent} from 'react';
import { Input, Menu, Button, Icon, Responsive } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class MenuNav extends PureComponent {

    state = {
        query: ''
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.setState({
            query: e.target.value
        }, 
        () =>  axios.get(`http://localhost:3004/articles?title=${this.state.query}`)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
        )
    }

    render() {
        const btn = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '5px',
            marginLeft: '5px',
            width: '120px'
        };
    
        const container = {
            height: '70px',
            width: '100%',
            border: 'none',
            position: 'fixed',
            zIndex: '1',
            top: '0',
            borderRadius: '0',
            display: 'flex',
            justifyContent: 'space-between'
        }
        
        return (
            <div>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <Menu style={container} >
                        <Menu.Item className="container" as={NavLink} to="/">
                            <h2>Logo</h2>
                        </Menu.Item>
            
                        <Menu.Item className="container" position='right' >
                            <Input style={{marginRight: '10px'}} className='icon' icon='search' placeholder='Search...' onChange={this.handleSearch} />

                            <Button basic color='blue' style={btn} animated='vertical' as={NavLink} to="/category" >
                                <Button.Content hidden>
                                    Categories
                                </Button.Content>
                                <Button.Content visible>
                                    <Icon name='list alternate outline' />
                                </Button.Content>
                            </Button>
            
                            <Button basic color='blue' style={btn} animated='vertical' as={NavLink} to="/login" >
                                <Button.Content hidden>
                                    Log In
                                </Button.Content>
                                <Button.Content visible>
                                    <Icon name='sign in' />
                                </Button.Content>
                            </Button>
            
                            <Button basic color='blue' style={btn} animated='vertical' as={NavLink} to="/signup"  >
                                <Button.Content hidden>
                                    Sign Up 
                                </Button.Content>
                                <Button.Content visible>
                                    <Icon name='signup' />
                                </Button.Content>
                            </Button>  
                        </Menu.Item>
                    </Menu>
                </Responsive>
                <Responsive minWidth={Responsive.onlyMobile.minWidth}>
                    <Menu style={container} >
                        <Menu.Item className="container" as={NavLink} to="/">
                            <h2>Logo</h2>
                        </Menu.Item>
            
                        <Menu.Item className="container" style={{position: 'fixed', top: '10px', right: '0', width: '70%'}}>
                            <Input style={{marginRight: '10px', width: '100%'}} className='icon' icon='search' placeholder='Search...' onChange={this.handleSearch} />

                        </Menu.Item>
                    </Menu>
                </Responsive>
            </div>
        )
    }
}

export default MenuNav;

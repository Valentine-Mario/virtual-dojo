import React, {Component} from 'react';
import { Input, Menu, Button, Icon, Responsive, Sidebar } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';

class MenuNav extends Component {

    state = {
        query: '',
        sidebarOpened: false
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

    handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

    render() {
        let { sidebarOpened } = this.state;

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
                <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
                    <Menu style={container} >
                        <Sidebar as={Menu} animation='slide along' inverted vertical visible={sidebarOpened}>
                            <Menu.Item as={Link} to="/" onClick={this.handleToggle} >Home</Menu.Item>
                            <Menu.Item as={Link} to="/category" onClick={this.handleToggle}>Category</Menu.Item>
                            <Menu.Item as={Link} to="/login" onClick={this.handleToggle} >Log in</Menu.Item>
                            <Menu.Item as={Link} to="/signup" onClick={this.handleToggle} >Sign Up</Menu.Item>
                        </Sidebar>

                        <Menu.Item className="container" as={NavLink} to="/">
                            <h2>Logo</h2>
                        </Menu.Item>
            
                        <Menu.Item className="container" style={{position: 'fixed', top: '2px', right: '0', width: '70%', paddingRight: '0'}}>
                            <Input style={{marginRight: '0', width: '100%'}} className='icon' icon='search' placeholder='Search...' onChange={this.handleSearch} />
                            <Menu.Item onClick={this.handleToggle} style={{marginLeft: '0'}}>
                                <Icon name='sidebar' style={{margin: '0'}} />
                            </Menu.Item>
                        </Menu.Item>
                    </Menu>
                </Responsive>
            </div>
        )
    }
}

export default MenuNav;

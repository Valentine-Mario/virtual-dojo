import React, {Component} from 'react';
import { Input, Menu, Button, Icon, Responsive, Sidebar } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { isLoggedIn } from '../../config';
import { REQ_GET } from '../../api'

class AuthMenu extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            query: '',
            sidebarOpened: false,
            loggedIn: false
        }
    }


    handleSearch = (e) => {
        e.preventDefault();
        this.setState({
            query: e.target.value
        }, 
        () => REQ_GET(`users/search/${this.state.query}`)
                .then(res => {
                    console.log(res)
                })
                 /*axios.get(`http://localhost:3004/articles?title=${this.state.query}`)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })*/
        )
    }

    handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

    handleLogOut = () => {
        sessionStorage.clear('user');
        this.props.history.push('/login');
    }

    render() {
        let { sidebarOpened, loggedIn } = this.state;

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
                            <Button basic color='blue' style={btn} animated='vertical' as={NavLink} to="/auth/user">
                                <Button.Content hidden>
                                    Dashboard
                                </Button.Content>
                                <Button.Content visible>
                                    <Icon name='user' />
                                </Button.Content>
                            </Button>
                            <Button basic color='blue' style={btn} animated='vertical' onClick={this.handleLogOut}>
                                <Button.Content hidden>
                                    Log Out
                                </Button.Content>
                                <Button.Content visible>
                                    <Icon name='sign out' />
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
                            <Menu.Item as={Link} to="/auth/user" onClick={this.handleToggle} >Dashboard</Menu.Item>   
                            <Menu.Item onClick={() => {this.handleLogOut(); this.handleToggle()}} >Log Out</Menu.Item>
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

export default withRouter(AuthMenu);

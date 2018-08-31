import React, {Component} from 'react';
import { Input, Menu, Button, Icon, Responsive, Sidebar, List, Image } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { isLoggedIn } from '../../config';
import { REQ_GET } from '../../api';
import { isEmpty } from 'lodash';

class UnAuthMenu extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            sidebarOpened: false,
            searching: false,
            output: [],
            loading: false
        }
    }


     /**HANDLE ALL REQUEST FOR THE SEARCH AND PERFORM REDIRECTIONS*/
    handleSearch = (e) => {
        if(e.target.value.trim() == ''){
            this.setState({
                searching: false,
                loading: false,
                output: []
            })
        }else {
             REQ_GET(`category/search/${e.target.value.trim()}`)
                .then(res => {
                    this.setState({
                        output: res.data,
                        searching: true,
                        loading: false
                    })
                })
        }
    }

    handleClick = (courseID) => {
        this.props.history.push(courseID);
        window.location.reload();
    }

    handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

    handleLogOut = () => {
        sessionStorage.clear('user');
        this.props.history.push('/login');
    }

    render() {
        let { sidebarOpened, output, searching, loading } = this.state;

        let currentContent = !isEmpty(output) ? 
                            this.state.output.map((value) => {
                            return (
                                <List.Item key={value._id} style={{display: 'flex'}} onClick={() => this.handleClick(`/auth/course/${value._id}`)}>
                                  <Image avatar src={value.image} />
                                  <List.Content>
                                    <List.Header>{value.name}</List.Header>
                                    {value.description}
                                  </List.Content>
                                </List.Item>
                            )
                        })
                        :
                        (
                            <List.Item style={{display: 'flex'}}>
                              <Icon name='help' />
                              <List.Content>
                                <List.Header>No result found...</List.Header>
                              </List.Content>
                            </List.Item>
                        )

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
            justifyContent: 'space-between',
            backgroundColor: 'rgb(173, 215, 232)'
        }
        
        return (
            <div>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <Menu style={container} >
                        <Menu.Item className="container" as={NavLink} to="/">
                            <h2>Logo</h2>
                        </Menu.Item>
            
                        <Menu.Item className="container" position='right' >
                            <Input loading={loading} style={{marginRight: '10px', backgroundColor: '#f0f8fb', borderRadius: '6px'}} className='icon' icon='search' placeholder='Search course...' onChange={this.handleSearch} />
                            
                            { searching && 
                                <div style={{borderRadius: '5px', position: 'absolute', top: '53px', backgroundColor: 'rgba(200, 234, 247, 0.94)', overflowY: 'scroll', maxHeight: '180px', width: '51%'}}><List celled animated verticalAlign="top">{currentContent}</List></div>}

                            <Button basic color='blue' style={btn} animated='vertical' as={NavLink} to="/auth/course" >
                                <Button.Content hidden>
                                    Courses
                                </Button.Content>
                                <Button.Content visible>
                                    <Icon name='video play' />
                                </Button.Content>
                            </Button>
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
                            <Menu.Item as={Link} to="/" onClick={this.handleToggle}>Home</Menu.Item>
                            <Menu.Item as={Link} to="/auth/course" onClick={this.handleToggle}>Courses</Menu.Item>
                            <Menu.Item as={Link} to="/category" onClick={this.handleToggle}>Category</Menu.Item>
                            <Menu.Item as={Link} to="/login" onClick={this.handleToggle} >Log in</Menu.Item>
                            <Menu.Item as={Link} to="/signup" onClick={this.handleToggle} >Sign Up</Menu.Item>
                        </Sidebar>

                        <Menu.Item className="container" as={NavLink} to="/">
                            <h2>Logo</h2>
                        </Menu.Item>
            
                        <Menu.Item className="container" style={{position: 'fixed', top: '2px', right: '0', width: '70%', paddingRight: '0'}}>
                            <Input loading={loading} style={{marginRight: '0', width: '100%', backgroundColor: '#f0f8fb', borderRadius: '6px'}} className='icon' icon='search' placeholder='Search course...' onChange={this.handleSearch} />

                            { searching && 
                                <div style={{borderRadius: '3px', position: 'absolute', top: '53px', backgroundColor: 'rgba(200, 234, 247, 0.94)', overflowY: 'scroll', maxHeight: '150px', width: '80%'}}><List celled animated verticalAlign="top">{currentContent}</List></div>}
                            
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

export default withRouter(UnAuthMenu);
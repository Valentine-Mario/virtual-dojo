import React, {Component} from 'react';
import { Input, Menu, Button, Icon, Responsive, Sidebar } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { isLoggedIn } from '../../config';
import { REQ_GET } from '../../api';
import { isEmpty } from 'lodash'

class AuthMenu extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            query: '',
            sidebarOpened: false,
            loggedIn: false,
            searching: false,
            output: []
        }
    }


    /**HANDLE ALL REQUEST FOR THE SEARCH AND PERFORM REDIRECTIONS*/
    handleSearch = (e) => {
        // e.preventDefault();
        if(e.target.value == ''){
            this.setState({
                searching: false
            })
        }

        this.setState({
            query: e.target.value
        }, () => /*REQ_GET(`autocomplete?searchQuery=${this.state.query.trim()}`)
                .then(res => {
                    this.showSearch(res.data)
                })*/

                  fetch(`https://api.udilia.com/coins/v1/autocomplete?searchQuery=${this.state.query}`)
                    .then(response => {
                      return response.json().then(json => {
                        return response.ok ? json : Promise.reject(json);
                      });
                    })
                    .then((data) => {
                      console.log('Success', data);


                      this.showSearch(data);
                    })
                    .catch((error) => {
                      console.log('Error', error);
                    })
        )
    }

    showSearch = (output) => {
        this.setState({
            output,
            searching: true
        })

        /**USE THIS FOR TOGGLING OF SEARCH RESULT AREA*/
        if(isEmpty(output)){
            console.log('empty')
            this.setState({
                searching: false,
                output: []
            })
        }


    }

    handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

    handleLogOut = () => {
        sessionStorage.clear('user');
        this.props.history.push('/login');
    }

    render() {
        let { sidebarOpened, loggedIn, searching, output } = this.state;

        let nowOutput = !isEmpty(output) ? 
                            this.state.output.map((value) => {
                            return (
                                <div key={value.id} style={{padding: '5px', paddingLeft: '15px'}}>
                                    <p>{value.name}</p>
                                </div>
                            )
                        })
                        :
                        (<div>No results found</div>)


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
            zIndex: '10',
            top: '0',
            borderRadius: '0',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'rgb(173, 215, 232)'
        }
        
        return (
            <div style={{zIndex: '10'}}>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <Menu style={container} >
                        <Menu.Item className="container" as={NavLink} to="/">
                            <h2>Logo</h2>
                        </Menu.Item>
            
                        <Menu.Item className="container" position='right' >
                            <Input style={{marginRight: '10px', backgroundColor: '#f0f8fb', borderRadius: '6px'}} className='icon' icon='search' placeholder='Search...' onChange={this.handleSearch} />
                            
                            { searching && 
                                <div style={{borderRadius: '5px', position: 'absolute', top: '70px', backgroundColor: '#f0f8fb', overflowY: 'scroll', maxHeight: '100px', width: '53%'}}>{nowOutput}</div>}

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
                            <Menu.Item as={Link} to="/auth/course" onClick={this.handleToggle}>Course</Menu.Item>
                            <Menu.Item as={Link} to="/auth/user" onClick={this.handleToggle} >Dashboard</Menu.Item>   
                            <Menu.Item onClick={() => {this.handleLogOut(); this.handleToggle()}} >Log Out</Menu.Item>
                        </Sidebar>

                        <Menu.Item className="container" as={NavLink} to="/">
                            <h2>Logo</h2>
                        </Menu.Item>
            
                        <Menu.Item className="container" style={{position: 'fixed', top: '2px', right: '0', width: '70%', paddingRight: '0'}}>
                            <Input style={{marginRight: '0', width: '100%', backgroundColor: '#f0f8fb', borderRadius: '6px'}} className='icon' icon='search' placeholder='Search...' onChange={this.handleSearch} />
                            
                            { searching && 
                                <div style={{borderRadius: '5px', position: 'absolute', top: '70px', backgroundColor: '#f0f8fb', overflowY: 'scroll', maxHeight: '100px', width: '53%'}}>{nowOutput}</div>}

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

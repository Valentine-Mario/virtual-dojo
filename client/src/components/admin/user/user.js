import React, { Component } from 'react';
import MainNav from '../menu/mainNav';
import SideNav from '../menu/sideNav';
import { Card, Button, Image, Dimmer, Loader, Input } from 'semantic-ui-react';
import { REQ_GET, REQ_POST } from '../../../api';
import Time from '../../time';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            loading: false,
            searchLoad: false
        }
    }

    componentDidMount() {

        this.setState({
            loading: true
        })

        this.getUsers();

    }

    getUsers = () => {
        REQ_GET('users/users')
            .then(res => {
                if(res.data){
                    this.setState({
                        users: res.data.message,
                        loading: false
                    })
                }else {
                    console.log('error')
                    this.setState({
                        loading: false
                    })
                }
            })   
    }

    handleSearch = (e) => {
        this.setState({
            searchLoad: true
        })
        if(e.target.value.trim() == ''){
            this.getUsers();

            this.setState({
                searchLoad: false
            })
        }else {
            REQ_GET(`users/search/${e.target.value}`)
                .then(res => {
                    this.setState({
                        users: res.data.message,
                        searchLoad: false
                    })
                })
        }

    }

    handleDelete = (userID) => {
        let admin = JSON.parse(localStorage.getItem('user'));

        REQ_POST(`users/delete/${userID}`, {user: admin[0]})
            .then(res => {
                console.log(res);
                window.location.reload();
            })
    }

    render() {
        let { loading, users, searchLoad } = this.state;

        return (
            <div >
            	<MainNav />
            		<div style={{marginTop: '100px', marginLeft: '150px'}}>

                        <Input loading={searchLoad} fluid onChange={this.handleSearch} icon='users' iconPosition='right' placeholder='Search users...' style={{width: '290px', margin: 'auto', marginBottom: '15px'}}/>
                    
                        <Dimmer active={loading} inverted>
                            <Loader inverted>Loading</Loader>
                        </Dimmer>
                        <Card.Group centered stackable style={{zIndex: '0', width: '80%', margin: 'auto', marginTop: '40px'}}>
                            {
                                users &&
                                    users.map((user) => {
                                        return (
                                            <Card raised key={user._id} style={{width: '30%'}}>
                                                <Image src={user.profile_pics} />
                                                <Card.Content>
                                                  <Card.Header>{`${user.firstName} ${user.lastName}`}</Card.Header>
                                                  <Card.Description><strong>Email:</strong> {user.email}</Card.Description>
                                                  <Card.Description><strong>Username:</strong> {user.username}</Card.Description>
                                                  <Card.Description><strong>Date Joined:</strong> <Time time={user.time} /></Card.Description>
                                                </Card.Content>
                                                <Card.Content extra>
                                                  <Button inverted color='red' onClick={() => this.handleDelete(user._id)}>
                                                    Delete User
                                                  </Button>
                                                </Card.Content>
                                            </Card>
                                        )
                                    })
                            }
                        </Card.Group>
                    </div>
            	<SideNav />
            </div>
        );
    }
}

export default Users;

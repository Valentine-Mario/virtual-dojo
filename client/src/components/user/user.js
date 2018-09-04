import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Card, Image, Grid, Dimmer, Loader, Responsive, Button } from 'semantic-ui-react';
import MenuNav from '../menu/menu';
import Footer from '../menu/footer';
import { REQ_GET } from '../../api';

class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: [],
            loading: false
        }
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        this.setState({
            loading: true
        });

        window.scrollTo(0, 0);

        REQ_GET(`users/${user[0]}`)
            .then(res => {
                if(res){
                    if(res.data){
                        this.setState({
                            user: res.data,
                            loading: false
                        })
                    }else {
                        alert('Error in network connection, try again');
                        this.setState({
                            loading: false
                        })
                    }
                }else {
                    alert('Error in network connection, try again');
                    this.setState({
                        loading: false
                    })
                }
            })
    }

    handleClick = (id) => {
        this.props.history.push(`/auth/user/edit/${id}`)
    }

    render() {
        let { user, loading } = this.state;

    	const container = {
    		marginTop: '80px'
    	}

        return (
            <div>
                <MenuNav />
                <Responsive minWidth={Responsive.onlyTablet.minWidth} style={container} >

                    {
                        loading &&
                            <Dimmer active inverted>
                                <Loader inverted content='Loading' />
                            </Dimmer>
                    }

                    <Grid columns='2' divided inverted padded>
                        <Grid.Row>
                          <Grid.Column width='3' style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center', fontSize: '20px', fontWeight: '500'}}>
                            <Image src={user.profile_pics} height="145px" width="200px" style={{width: '200px', height: '200px', border: '5px solid lightblue', padding: '5px'}} circular/>
                            {`${user.firstName} ${user.lastName}`}
                            <Grid.Row style={{marginTop: '5px'}}>
                                <Grid.Column>
                                    <Button inverted color="blue" onClick={() => this.handleClick(`${user._id}`)}>Edit Account</Button>
                                </Grid.Column>
                            </Grid.Row>
                          </Grid.Column>
                          <Grid.Column width='13'>
                            <Card.Group centered >
                                {
                                    user.library &&
                                        user.library.map(course => {
                                            return (
                                                <Card key={course._id} as={Link} to={`/auth/course/${course._id}`}>
                                                  <Card.Content
                                                    header={course.name}
                                                    description={course.description}
                                                  />
                                                </Card>
                                            )
                                        })
                                }
                            </Card.Group>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                </Responsive>

                <Responsive maxWidth={Responsive.onlyMobile.maxWidth} style={container}>

                    {
                        loading &&
                            <Dimmer active inverted>
                                <Loader inverted content='Loading' />
                              </Dimmer>
                    }

                    <Grid columns='1' inverted padded>
                        <Grid.Row style={{display: 'flex', justifyContent: 'center'}}>
                            <Grid.Column width='16' style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center', fontSize: '17px', fontWeight: '500'}}>
                                <Image src={user.profile_pics} style={{width: '150px', height: '150px', border: '3px solid lightblue', padding: '3px'}} circular/>
                                {`${user.firstName} ${user.lastName}`}
                                <Grid.Row style={{marginTop: '5px'}}>
                                    <Grid.Column>
                                        <Button inverted color="blue" onClick={() => this.handleClick(`${user._id}`)}>Edit Account</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{display: 'flex', justifyContent: 'center'}}>
                          <Grid.Column width='16'>
                            <Card.Group  centered>
                                {
                                    user.library &&
                                        user.library.map(course => {
                                            return (
                                                <Card key={course._id} textAlign="left" as={Link} to={`/auth/course/${course._id}`}>
                                                  <Card.Content
                                                    header={course.name}
                                                    description={course.description}
                                                  />
                                                </Card>
                                            )
                                        })
                                }
                            </Card.Group>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                </Responsive>

                <Footer />
            </div>
        );
    }
}

export default User;

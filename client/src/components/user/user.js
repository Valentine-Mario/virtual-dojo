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
        })

        REQ_GET(`users/${user[0]}`)
            .then(res => {
                if(res.data){
                    this.setState({
                        user: res.data,
                        loading: false
                    })

                    console.log(res.data)
                }else {
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
                          <Grid.Column width='3' style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center'}}>
                            <Image src={user.profile_pics} height="170px" width="200px" />
                            {`${user.firstName} ${user.lastName}`}
                            <Grid.Row>
                                <Grid.Column>
                                    <Button inverted color="blue" onClick={() => this.handleClick(`${user._id}`)}>Edit Account</Button>
                                </Grid.Column>
                            </Grid.Row>
                          </Grid.Column>
                          <Grid.Column width='13'>
                            <Card.Group  >
                                {
                                    user.library &&
                                        user.library.map(course => {
                                            return (
                                                <Card key={course._id} as={Link} to={`/auth/course/${course._id}`}>
                                                  <Card.Content
                                                    header={course.name}
                                                    meta='Friend'
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
                          <Grid.Column width='3' style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center'}}>
                            <Image src={user.profile_pics} height="150px" width="150px" style={{minWidth: '120px'}}/>
                            {`${user.firstName} ${user.lastName}`}
                            <Grid.Row>
                                <Grid.Column>
                                    <Button inverted color="blue">Edit Account</Button>
                                </Grid.Column>
                            </Grid.Row>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{display: 'flex', justifyContent: 'center'}}>
                          <Grid.Column width='13'>
                            <Card.Group  >
                                {
                                    user.library &&
                                        user.library.map(course => {
                                            return (
                                                <Card key={course._id} textAlign="left" as={Link} to={`/auth/course/${course._id}`}>
                                                  <Card.Content
                                                    header={course.name}
                                                    meta='Friend'
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

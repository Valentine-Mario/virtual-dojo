import React, { Component } from 'react';
import { Form, Button, Grid, Image, Input, Progress, Responsive } from 'semantic-ui-react';
import MenuNav from '../menu/menu';
import Footer from '../menu/footer';
import { REQ_GET, REQ_POST } from '../../api';
import axios from 'axios';

class UserEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            loading: false,
            firstName: '',
            lastName: '',
            email: '',
            image: null,
            progress: 0,
            active: false
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        })

        window.scrollTo(0, 0);

        this.getUser()
    }

    getUser = () => {
        REQ_GET(`users/${this.props.match.params.id}`)
            .then(res => {
                if(res.data){
                    this.setState({
                        user: res.data,
                        loading: false,
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        email: res.data.email
                    }) 
                }else {
                    alert('Error in Network Connection');
                    this.setState({
                        loading: false
                    })
                }
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value    
        })
        
    }

    handleImage = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    handleSubmit = () => {
        let { firstName, lastName, email } = this.state;
        this.setState({
            loading: true
        })

        let user = { firstName, lastName, email }

        REQ_POST(`users/edit/${this.props.match.params.id}`, user)
            .then(res => {
                if(res.data) {
                    this.setState({
                        loading: false
                    })
                    this.getUser();
                }else {
                    alert('Error in network connection, try again');
                    this.setState({
                        loading: false
                    })
                }
            })
    }

    handleImageUpdate = (e) => {
        e.preventDefault();

        let { image } = this.state;

        let Image = new FormData();
        Image.append('profile_pics', image);

        try {
            // statements
            axios({
                method: 'post',
                url: `https://virtualserver.herokuapp.com/users/update-profile/${this.props.match.params.id}`,
                data: Image,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    this.setState({
                        active: true,
                        progress: Math.round((loaded/total) * 100)
                    })
                }
            })
            .then(res => {
                if(res.data){
                    this.getUser();
                }else {
                    alert('Error in network connection, try again');
                }

                this.setState({
                    image: null,
                    active: false
                })
            })
            .then(err => {
                console.log(err)
            })
        } catch(e) {
            // statements
            console.log(e);
            this.setState({
                image: null
            })
        }
    }

    render() {
        let { user, loading, firstName, lastName, email, progress, active } = this.state;

        let imageUpdate = {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'
        }

        return (
            <div>
            	<MenuNav />
                <Responsive minWidth={Responsive.onlyTablet.minWidth} style={{marginTop: '90px'}} >
                    <Grid columns={2} padded='vertically' style={{margin: '15px'}}>
                      <Grid.Column width={4}>
                        {
                            active &&
                                <Progress percent={progress} indicating progress size="small" />
                        }
                        <Image src={user.profile_pics} />

                        <Grid.Row style={{margin: '10px'}}>
                            <Form onSubmit={this.handleImageUpdate} encType="multipart/form-data">
                                <Form.Field>
                                  <Input accept=".jpeg .png .jpg" id="image" placeholder='update image' type="file" onChange={this.handleImage}/>
                                </Form.Field>
                                <Button >Edit Picture</Button>
                            </Form>
                        </Grid.Row>

                      </Grid.Column>
                      <Grid.Column width={12}>
                        <Form loading={loading} onSubmit={this.handleSubmit}>
                            <Form.Field>
                              <label>First Name</label>
                              <input name="firstName" placeholder='First Name' value={firstName} onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                              <label>Last Name</label>
                              <input name="lastName" placeholder='Last Name' value={lastName} onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                              <label>Email</label>
                              <input name="email" placeholder='email' value={email} onChange={this.handleChange} />
                            </Form.Field>
                            <Button type='submit'>Edit Details</Button>
                        </Form>
                      </Grid.Column>
                    </Grid>
                </Responsive>

                <Responsive maxWidth={Responsive.onlyMobile.maxWidth} style={{marginTop: '90px'}} >
                    <Grid padded='vertically' style={{margin: '15px'}}>
                        <Grid.Row>
                          <Grid.Column>
                            {
                                active &&
                                    <Progress percent={progress} indicating progress size="small" />
                            }
                            <Image src={user.profile_pics} />

                            <Grid.Row style={{margin: '10px'}}>
                                <Form onSubmit={this.handleImageUpdate} encType="multipart/form-data" style={imageUpdate}>
                                    <Form.Field>
                                      <Input accept=".jpeg .png .jpg" id="image" placeholder='update image' type="file" onChange={this.handleImage}/>
                                    </Form.Field>
                                    <Button >Edit Picture</Button>
                                </Form>
                            </Grid.Row>

                          </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                          <Grid.Column >
                    		<Form loading={loading} onSubmit={this.handleSubmit} style={imageUpdate}>
                                <Form.Field>
                                  <label>First Name</label>
                                  <input name="firstName" placeholder='First Name' value={firstName} onChange={this.handleChange} />
                                </Form.Field>
                                <Form.Field>
                                  <label>Last Name</label>
                                  <input name="lastName" placeholder='Last Name' value={lastName} onChange={this.handleChange} />
                                </Form.Field>
                                <Form.Field>
                                  <label>Email</label>
                                  <input name="email" placeholder='email' value={email} onChange={this.handleChange} />
                                </Form.Field>
                                <Button type='submit'>Edit Details</Button>
                            </Form>
                          </Grid.Column>
                      </Grid.Row>
                    </Grid>
                </Responsive>
            	<Footer />
            </div>
        );
    }
}

export default UserEdit;

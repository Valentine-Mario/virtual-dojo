import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Table, Loader, Dimmer, Card, Image, Grid, Form, Input, Progress, TextArea, TransitionablePortal, Segment, Header, Icon } from 'semantic-ui-react';
import { REQ_GET, REQ_POST } from '../../../api';
import axios from 'axios';
import MainNav from '../menu/mainNav';
import SideNav from '../menu/sideNav';

class ListCategories extends Component {
    constructor(props) {
        super(props);

        this.state = {
          category: [],
          categoryId: '',
          loading: false,
          deleting: false,
          disabled: false,
          progress: 0,
          name: '',
          description: '',
          cover_image: null,
          loadEdit: false,
          transition: false
        }
    }

    componentDidMount() {
      this.setState({
        loading: true
      })

      this.getAllCategories();

      window.scrollTo(0, 0);
    }

    getAllCategories = () => {
      REQ_GET('supercat/get')
        .then(res => {
          if(res.data){
            this.setState({
              category: res.data,
              loading: false,
              deleting: false
            })
          }else {
            alert('Error in network connection, try again');
            this.setState({
              loading: false
            })
          }
        });
    }

    handleShowEdit = (id) => {
      this.setState({
        loadEdit: true,
        categoryId: id
      })

      REQ_GET(`supercat/get/${id}`)
        .then(res => {
          if(res.data){
            this.setState({
              name: res.data.name,
              description: res.data.description
            })
          }else {
            alert('Error in network connection, try again');
          }
        })

    }

    handleDelete = (id) => {
      let userid = JSON.parse(localStorage.getItem('user'));
      
      this.setState({
        deleting: true
      })

      REQ_POST(`supercat/delete/${id}`, {user: userid[0]})
        .then(res => {
          if(res.data){
            this.getAllCategories();
          }else {
            alert('Error in network connection, try again');
          }
        });
    }

    handleEdit = (e) => {
      e.preventDefault();
      this.setState({
        disabled: true
      })

      let { name, description, cover_image, categoryId } = this.state;

      let updatedCategory = new FormData();
      updatedCategory.append('name', name);
      updatedCategory.append('description', description);
      updatedCategory.append('cover_image', cover_image);

      try {
        // statements
        axios({
            method: 'post',
            url: `https://virtualserver.herokuapp.com/supercat/edit/${categoryId}`,
            data: updatedCategory,
            headers: {
                    'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                this.setState({
                    progress: Math.round((loaded/total) * 100)
                }, () => console.log((loaded/total)*100))
            }
        })
        .then(res => {
          if(res.data) {
            this.setState({
              disabled: false,
              transition: true,
            }, () => this.getAllCategories())
          }else {
            alert('Error in network connection, try again');
          }
        })
        .then(err => {
            console.log(err);
            this.setState({
                disabled: false,
            })
        })
      } catch(e) {
        // statements
        console.log(e);
      }

    }

    handleChange = (e) => {
      this.setState({
        [e.target.id]: e.target.value
      })
    }

    handleImageChange = (e) => {
      this.setState({
        cover_image: e.target.files[0]
      })
    }

    handleClose = () => {
      setTimeout(() => this.setState({transition: false}), 5000)
    }

    render() {
      let { category, loading, deleting, disabled, progress, name, description, loadEdit, transition } = this.state;
        return (
          <div>
            <MainNav />
            <div style={{marginTop: '90px', marginLeft: '170px'}}>

              <TransitionablePortal onOpen={this.handleClose} open={transition} transition={{animation: 'fly left', duration: 1000}}>
                <Segment style={{ right: '2%', position: 'fixed', top: '0%', zIndex: 1000, background: '#61e261bf', width: '40%' }}>
                  <Header><Icon name="check circle outline" size="big" /></Header>
                  <p>Category was updated successfully.</p>
                </Segment>
              </TransitionablePortal>

              <Button inverted primary as={Link} to="/admin/dashboard/create_category">
                Create Category
              </Button>

              <Grid >
                <Grid.Column width={9}>
                  <Card.Group style={{marginTop: '20px'}}>
                    <Dimmer active={loading} inverted style={{zIndex: '0px'}}>
                      <Loader indeterminate>Preparing Files</Loader>
                    </Dimmer>
                    <Dimmer active={deleting} inverted style={{zIndex: '0px'}}>
                      <Loader indeterminate>Deleting Category</Loader>
                    </Dimmer>
                    {
                      category &&
                        category.map((file) => {
                          return (
                            <Card key={file._id}>
                              <Card.Content>
                                <Image floated='right' size='tiny' src={file.cover_image} />
                                <Card.Header>{file.name}</Card.Header>
                                <Card.Description>
                                  {file.description}
                                </Card.Description>
                              </Card.Content>
                              <Card.Content extra>
                                <div className='ui two buttons'>
                                  <Button basic color='green' onClick={() => this.handleShowEdit(file._id)}>
                                    Edit
                                  </Button>
                                  <Button basic color='red' onClick={() => this.handleDelete(file._id)}>
                                    Delete
                                  </Button>
                                </div>
                              </Card.Content>
                            </Card>
                          )
                        })

                    }
                  </Card.Group>
                </Grid.Column>
                <Grid.Column width={7}>

                  {
                    loadEdit &&
                      <Form onSubmit={this.handleEdit} style={{padding: '25px', margin: 'auto'}} encType="multipart/form-data">
                          {
                              disabled &&
                                  <Progress percent={progress} indicating progress size="small" />
                          }
                          <Form.Field disabled={disabled}>
                            <label htmlFor="name">Category Name</label>
                            <Input id="name" placeholder='name' value={name} onChange={this.handleChange} />
                          </Form.Field>
                          <Form.Field disabled={disabled}>
                            <label htmlFor="description">Category Description</label>
                            <TextArea id="description" placeholder='Tell us more about this category' value={description} onChange={this.handleChange} />
                          </Form.Field>
                          <Form.Field disabled={disabled}>
                            <label htmlFor="cover_image">Cover Image</label>
                            <Input accept=".jpg, .jpeg, .png" id="cover_image" placeholder='upload image only' type="file" onChange={this.handleImageChange}/>
                          </Form.Field>
                          <Button type='submit' disabled={disabled}>Edit</Button>
                      </Form>
                  }
                </Grid.Column>
              </Grid>

            </div>
            <SideNav /> 
          </div> 
        );
    }
}

export default withRouter(ListCategories);

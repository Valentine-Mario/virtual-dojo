import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Table, Loader, Dimmer, Card, Image } from 'semantic-ui-react';
import { REQ_GET, REQ_POST } from '../../../api';
import MainNav from '../menu/mainNav';
import SideNav from '../menu/sideNav';

class ListCategories extends Component {
    constructor(props) {
        super(props);

        this.state = {
          category: [],
          loading: false,
          deleting: false
        }
    }

    componentDidMount() {
      this.setState({
        loading: true
      })

      this.getAllCategories();
    }

    getAllCategories = () => {
      REQ_GET('supercat/get')
        .then(res => {
          this.setState({
            category: res.data,
            loading: false,
            deleting: false
          })
        });
    }

    handleDelete = (id) => {
      let userid = JSON.parse(localStorage.getItem('user'));
      
      this.setState({
        deleting: true
      })

      REQ_POST(`supercat/delete/${id}`, {user: userid[0]})
        .then(res => {
          console.log(res);
          this.getAllCategories();
        });
    }

    render() {
      let { category, loading, deleting } = this.state;
        return (
          <div>
            <MainNav />
            <div style={{marginTop: '90px', marginLeft: '170px'}}>

              <Button inverted primary as={Link} to="/admin/dashboard/create_category">
                Create Category
              </Button>



              <Card.Group style={{marginTop: '20px'}}>
                <Dimmer active={loading} inverted>
                  <Loader indeterminate>Preparing Files</Loader>
                </Dimmer>
                <Dimmer active={deleting} inverted>
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
                              <Button basic color='green'>
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
            </div>
            <SideNav /> 
          </div> 
        );
    }
}

export default withRouter(ListCategories);

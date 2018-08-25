import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Table, Loader, Dimmer, Card, Image } from 'semantic-ui-react';
import { REQ_GET } from '../../../api';

class ListCategories extends Component {
    constructor(props) {
        super(props);

        this.state = {
          category: [],
          loading: false
        }
    }

    componentDidMount() {
      this.setState({
        loading: true
      })

      REQ_GET('supercat/get')
        .then(res => {
          this.setState({
            category: res.data,
            loading: false
          })

          console.log(res.data);
        });
    }

    handleDelete = (id) => {
      REQ_GET(`supercat/delete/${id}`)
        .then(res => {
          console.log(res)
          window.location.reload();
        });
    }

    render() {
      let { category, loading } = this.state;
        return (
          <div style={{marginTop: '90px', marginLeft: '170px'}}>

            <Button inverted primary as={Link} to="/admin/dashboard/create_category">
              Create Category
            </Button>



            <Card.Group style={{marginTop: '20px'}}>
              <Dimmer active={loading} inverted>
                <Loader indeterminate>Preparing Files</Loader>
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
        );
    }
}

export default withRouter(ListCategories);

import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { REQ_GET } from '../../api';
import { Card, Icon, Image, Dimmer, Loader } from 'semantic-ui-react';
import MenuNav from '../menu/menu';
import Footer from '../menu/footer';

class Category extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            loading: false
        }

    }

    componentDidMount(){
        this.setState({loading: true});


          REQ_GET('supercat/get')
            .then(res => {
              console.log(res);
              this.setState({
                  loading: false,
                  categories: res.data
              })
            })

      }

    render() {
        let { loading, categories } = this.state;

        let Cards = categories && categories.map((category) => {
            return (
                <Card raised key={category._id} as={Link} to={`/category/${category._id}`}>
                  <Card.Content>
                    <Image floated='right' size='tiny' src={category.cover_image} />
                    <Card.Header>{category.name}</Card.Header>
                    <Card.Meta></Card.Meta>
                    <Card.Description>
                      {category.description}
                    </Card.Description>
                  </Card.Content>
                </Card>

                )
            })

        return (
            <div>
                <MenuNav />
                <Card.Group centered style={{marginTop: '80px', marginBottom: '20px'}}>
                    {
                        loading ? 
                            (
                                <Dimmer active inverted>
                                    <Loader inverted>Loading</Loader>
                                </Dimmer>
                            ) 
                            : 
                            Cards
                    }
                </Card.Group>
                <Footer />
            </div>
        );
    }
}

export default Category;

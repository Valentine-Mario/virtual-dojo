import React, { PureComponent, PropTypes } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { REQ_GET } from '../../api';
import { Card, Icon, Image, Dimmer, Loader, Header, Segment } from 'semantic-ui-react';
import MenuNav from '../menu/menu';
import Footer from '../menu/footer';

class CategoryDetail extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            loading: false
        }

    }

    componentDidMount(){
        this.setState({loading: true});

        console.log(this.props);


          REQ_GET(`supercat/get/${this.props.match.params.id}`)
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

        /*let card = categories.map((category) => {
        return (
            <Card raised key={category._id} as={Link} to={`/category/${category._id}`} >
                <Image src={category.cover_image} size="big" />
                <Card.Content>
                    <Card.Header>{category.name}</Card.Header>
                    <Card.Description>{category.description}</Card.Description>
                </Card.Content>
            </Card>
            )
        })*/

        return (
            <div>
                <MenuNav />
                <div style={{width: '75%', margin: 'auto', marginTop: '100px'}}>
			      	<Segment.Group>
					    <Segment style={{fontSize: '25px', fontWeight: '500'}}>{categories.name}</Segment>
					    <Segment.Group style={{margin: 0, height: '40px', display: 'flex', justifyContent: 'center', border: 'none'}}>

					    	{
					    		loading &&
					    			<Dimmer active inverted>
	                                    <Loader inverted>Loading</Loader>
	                                </Dimmer>
					    	}

					    	{
					    		categories.courses &&
							    	categories.courses.map((course) => {
							    		return (
							    			<Segment key={course._id} as={Link} to={`/auth/course/${course._id}`} style={{background: 'none', fontWeight: '300', fontSize: '20px'}}>
							    				{course.name}
							    			</Segment>
							    		)
							    	})
					    	}
					    </Segment.Group>
					    <Segment>Bottom</Segment>
					  </Segment.Group>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(CategoryDetail);

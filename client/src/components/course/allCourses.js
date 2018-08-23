import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Image, Loader, Card } from 'semantic-ui-react';


class AllCourses extends Component {

    constructor(props) {
        super(props);

        this.state = {
        	videoListing: [],
        	loading: false
        }
    }

    componentDidMount() {
    	this.setState({
    		loading: true
    	})

    	fetch('http://localhost:3004/videos')
    		.then(res => res.json())
    		.then(data => {
    			console.log(data);
    			this.setState({
    				videoListing: data,
    				loading: false
    			})
    		})
    		.catch(err => console.log('There was an error ',err))
    }

    render() {
    	let { videoListing, loading } = this.state;

        return (
            <Card.Group style={{display: 'flex', justifyContent: 'center', zIndex: '0', marginTop: '70px'}}>
			    { loading ? 
			    	<Loader active inline='centered' />
			    	:
			    	videoListing.map((video) => {
				    	return (
				    		<Card
					    	  as={Link}
						      header={video.title}
						      meta={video.date}
						      description='Jenny is a student studying Media Management at the New School'
						      to={`/auth/course/${video.id}`}
						    />
				    	)
				    })}
		    </Card.Group>
        );
    }
}

export default AllCourses;
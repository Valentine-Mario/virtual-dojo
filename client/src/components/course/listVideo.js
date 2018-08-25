import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Image, Loader } from 'semantic-ui-react';


class ListVideo extends Component {

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
            <List animated verticalAlign='middle'>
			    { loading ? 
			    	<Loader active inline='centered' />
			    	:
			    	videoListing.map((video) => {
				    	return (
				    		<List.Item key={video.id} style={{padding: '10px'}} as={Link} to={`/auth/course/${video.id}`} >
						      	<List.Icon name='github' size='big' verticalAlign='top' />
						      	<List.Content>
						        	<List.Header>{video.title}</List.Header>
						        	<List.Description></List.Description>
						      	</List.Content>
						    </List.Item>
				    	)
				    })}
		    </List>
        );
    }
}

export default ListVideo;

import React, { Component } from 'react';
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
				    		<List.Item as='a' key={video.id} style={{padding: '10px'}}>
						      	<List.Icon name='github' size='big' verticalAlign='top' />
						      	<List.Content>
						        	<List.Header>{video.url}</List.Header>
						        	<List.Description>{video.title}</List.Description>
						      	</List.Content>
						    </List.Item>
				    	)
				    })}
		    </List>
        );
    }
}

export default ListVideo;

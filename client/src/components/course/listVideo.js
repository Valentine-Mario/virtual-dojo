import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { List, Image, Loader } from 'semantic-ui-react';
import { REQ_GET } from '../../api';


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

        REQ_GET(`category/get/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    videos: res.data.videos,
                    loading: false
                })
            })
    }

    render() {
    	let { videoListing, loading, videos } = this.state;

        return (
            <List animated style={{width: '90%', margin: 'auto'}}>
			    { 
                    loading &&
			    	    <Loader active inline='centered' />
                }

                {
                    videos &&
    			    	videos.map((video) => {
    				    	return (
    				    		<List.Item key={video._id} style={{padding: '10px'}} as={Link} to={`/auth/course/${this.props.match.params.id}/${video._id}`} >
    						      	<List.Icon name='video play' size='big' verticalAlign='top' />
    						      	<List.Content>
    						        	<List.Header>{video.name}</List.Header>
    						        	<List.Description>{video.description}</List.Description>
    						      	</List.Content>
    						    </List.Item>
    				    	)
    				    })
                }
		    </List>
        );
    }
}

export default withRouter(ListVideo);

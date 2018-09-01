import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Dimmer, Loader, Image, Icon, Grid, List } from 'semantic-ui-react';
import { REQ_GET, REQ_POST } from '../../../api';
import MainNav from '../menu/mainNav';
import SideNav from '../menu/sideNav';

class ListCourses extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	courses: [],
        	courseVideo: [],
        	loading: false,
        	deleting: false,
        	loadVideo: false
        }
    }

    componentDidMount() {
    	this.setState({
    		loading: true
    	})

    	this.getAllCourses();
    }

    getAllCourses = () => {
    	try {
    		// statements
	    	REQ_GET('category/get')
	    		.then(res => {
	    			this.setState({
	    				courses: res.data,
	    				loading: false
	    			})
	    		})
    	} catch(e) {
    		// statements
    		this.setState({
	    		loading: false
	    	})
    		console.log(e);
    	}

    }

    handleCourseVideo = (id) => {
    	console.log('clicked');
    	this.setState({
    		loadVideo: true
    	})

    	try {
    		// statements
	    	REQ_GET(`category/get/${id}`)
	        .then(res => {
	          this.setState({
	          	courseVideo: res.data.videos,
	          	loadVideo: false
	          })
	        });
    	} catch(e) {
    		// statements
    		console.log(e);
    	}

    }

    handleCourseDelete = (id) => {
    	let userid = JSON.parse(localStorage.getItem('user'));
    	this.setState({
    		deleting: true
    	})

    	try {
    		// statements
	    	REQ_POST(`category/delete/${id}`, {user: userid[0]})
	        .then(res => {
	          // window.location.reload();
	          this.getAllCourses();

	          this.setState({
	          	deleting: false
	          })

	        });
    	} catch(e) {
    		// statements
    		console.log(e);
    	}

    }

    handleVideoDelete = (id) => {
    	let userid = JSON.parse(localStorage.getItem('user'));

    	try {
    		// statements
	    	REQ_POST(`video/delete/${id}`, {user: userid[0]})
	    		.then(res => {
	    			this.handleCourseVideo(id);
	    		})
    	} catch(e) {
    		// statements
    		console.log(e);
    	}

    }

    render() {
    	let { courses, loading, deleting, courseVideo, loadVideo } = this.state;

        return (
        	<div>
	        	<MainNav />
	            <div style={{marginTop: '90px', marginLeft: '160px'}}>
		            <Button inverted primary as={Link} to="/admin/dashboard/create_course">
		              Create Course
		            </Button>

		            <Dimmer active={loading} inverted>
		                <Loader indeterminate>Getting Courses</Loader>
		            </Dimmer>
		            <Dimmer active={deleting} inverted>
		                <Loader indeterminate>Deleting Course</Loader>
		            </Dimmer>



		            <Grid columns={2}>
				      <Grid.Column width={10}>
				        
			            <Table color='blue' structured selectable style={{width: '100%', marginTop: '10px'}} celled striped>
					        <Table.Header>
					          <Table.Row>
					            <Table.HeaderCell>Image</Table.HeaderCell>
					            <Table.HeaderCell>Name</Table.HeaderCell>
					            <Table.HeaderCell>Description</Table.HeaderCell>
					            <Table.HeaderCell></Table.HeaderCell>
					          </Table.Row>
					        </Table.Header>

					        <Table.Body>

					        {
					        	courses &&
						        	courses.map((course) => {
						        		return (
								          <Table.Row key={course._id} style={{cursor: 'pointer'}} >
								            <Table.Cell onClick={() => this.handleCourseVideo(course._id)}>
								            	<Image src={course.image} size="tiny" />
								            </Table.Cell>
								            <Table.Cell onClick={() => this.handleCourseVideo(course._id)}>{course.name}</Table.Cell>
								            <Table.Cell>{course.description}</Table.Cell>
								            <Table.Cell onClick={() => this.handleCourseDelete(course._id)}>
								            	<Icon name="trash alternate" size="big" color="red" />
								            </Table.Cell>
								          </Table.Row>
						        		)
						        	})
					        }
					        </Table.Body>
					    </Table>
				        
				      </Grid.Column>
				      <Grid.Column width={6}>
				      	<Dimmer active={loadVideo} inverted>
				      		<Loader indeterminate >Getting Videos</Loader>
				      	</Dimmer>
				        <List divided verticalAlign='middle'>
						    {
						    	courseVideo &&
						    		courseVideo.map((video) => {
						    			return (
						    				<List.Item key={video._id}>
										      <List.Content floated='right'>
										        <Icon style={{cursor: 'pointer'}} name="trash" color="red" onClick={() => this.handleVideoDelete(video._id)} />
										      </List.Content>
										      <Icon name='video play' size="big" />
										      <List.Content>{video.name}</List.Content>
										    </List.Item>
						    			)
						    		})
						    }
						</List>
				      </Grid.Column>
				    </Grid>
	            </div>
	            <SideNav />
            </div>
        );
    }
}

export default ListCourses;

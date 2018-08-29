import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Dimmer, Loader, Image, Icon } from 'semantic-ui-react';
import { REQ_GET } from '../../../api';
import MainNav from '../menu/mainNav';
import SideNav from '../menu/sideNav';

class ListCourses extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	courses: [],
        	loading: false
        }
    }

    componentDidMount() {
    	this.setState({
    		loading: true
    	})

    	try {
    		// statements
	    	REQ_GET('category/get')
	    		.then(res => {
	    			console.log(res);
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

    	try {
    		// statements
	    	REQ_GET(`category/get/${id}`)
	        .then(res => {
	          console.log(res.data);
	        });
    	} catch(e) {
    		// statements
    		console.log(e);
    	}

    }

    handleCourseDelete = (id) => {
    	try {
    		// statements
	    	REQ_GET(`category/delete/${id}`)
	        .then(res => {
	          window.location.reload();
	        });
    	} catch(e) {
    		// statements
    		console.log(e);
    	}

    }

    render() {
    	let { courses, loading } = this.state;

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

		            <Table color='blue' structured selectable style={{width: '65%'}} celled striped>
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
	            </div>
	            <SideNav />
            </div>
        );
    }
}

export default ListCourses;

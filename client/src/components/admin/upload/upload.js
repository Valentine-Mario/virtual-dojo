/**
**EVERY SERVER CALL WITH ENDPOINT CATEGORY REFERS TO COURSES IN THE DATABASE...
**THE ENDPOINT SUPERCAT REFERS TO CATEGORIES IN THE DATABASE
*/

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button, Input, TextArea, Select, Progress, Segment, TransitionablePortal, Header, Icon } from 'semantic-ui-react';
import { REQ_GET } from '../../../api';
import axios from 'axios';
import MainNav from '../menu/mainNav';
import SideNav from '../menu/sideNav';

class UploadVideo extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	name: '',
        	description: '',
        	video: null,
        	course: '',
        	courses: [],
        	progress: 0,
        	disabled: false,
        	transition: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        
    	//GET ALL THE COURSES
    	REQ_GET('category/get')
    		.then(res => {
                if(res.data){
        			this.setState({
        				courses: res.data
        			})
                }else {
                    alert('Error in network connection, try again');
                }
    		})
    }

    handleChange = (e) => {
    	this.setState({
    		[e.target.id]: e.target.value
    	})
    	
    }

    handleOptionChange = (e) => {
    	this.setState({
    		course: e.target.value
    	})
    }

    handleVideoChange = (e) => {
    	this.setState({
    		video: e.target.files[0]
    	})
    }


    /** USING A DIFFERENT API CALL FOR UPLOADING VIDEO */
    handleSubmit = (e) => {
    	e.preventDefault();
    	this.setState({
    		disabled: true
    	})

    	let { name, description, video, course } = this.state;

    	let Course = new FormData();
    	Course.append('name', name);
    	Course.append('description', description);
    	Course.append('video', video);
    	Course.append('course', course);

    	try {
    		// statements
	    	axios({
			  	method: 'post',
			  	url: 'https://virtualserver.herokuapp.com/video/add',
			  	data: Course,
			  	headers: {
			  		'Content-Type': 'multipart/form-data'
			  	},
				onUploadProgress: (progressEvent) => {
			    	const { loaded, total } = progressEvent;
			    	this.setState({
			    		progress: Math.round((loaded/total) * 100)
			    	})
			  	}
			})
			.then(res => {
                if(res.data){
    				this.setState({
    					disabled: false,
    					name: '',
    					description: '',
    					video: null,
    					course: '',
    					progress: 0,
    					transition: true
    				})
                }else {
                    alert('Error in network connection, try again');
                }
			})
			.then(err => {
				console.log(err);
				this.setState({
					disabled: false,
					progress: 0
				})
			})
    	} catch(e) {
    		// statements
    		console.log(e);
    		this.setState({
				disabled: false,
				name: '',
				description: '',
				video: null,
				course: '',
				progress: 0,
				transition: true
			})
    	}


    }

    handleClose = () => {
    	setTimeout(() => this.setState({transition: false}), 5000)
    }

    render() {
    	let { name, description, video, course, courses, progress, disabled, transition } = this.state;


        return (
            <div>
                <MainNav />
              <div style={{marginTop: '120px', marginLeft: '200px'}}>

              	<TransitionablePortal onOpen={this.handleClose} open={transition} transition={{animation: 'fly left', duration: 1000}}>
    	          <Segment style={{ right: '2%', position: 'fixed', top: '0%', zIndex: 1000, background: '#61e261bf', width: '40%' }}>
    	            <Header><Icon name="check circle outline" size="big" /></Header>
    	            <p>The video upload was successful.</p>
    	          </Segment>
    	      	</TransitionablePortal>

              	<Form onSubmit={this.handleSubmit} style={{width: '500px', margin: 'auto'}} encType="multipart/form-data">
              		{
              			disabled &&
              				<Progress percent={progress} indicating progress size="small" />
    				}
    			    <Form.Field disabled={disabled}>
    			      <label htmlFor="name">Video Name</label>
    			      <Input id="name" placeholder='name' value={name} onChange={this.handleChange} />
    			    </Form.Field>
    			    <Form.Field disabled={disabled}>
    			      <label htmlFor="description">Video Description</label>
    			      <TextArea id="description" placeholder='Tell us more about this video' value={description} onChange={this.handleChange} />
    			    </Form.Field>
    			    <Form.Field disabled={disabled}>
    			      <label htmlFor="course">Course</label>
    			      <select id="course" value={course} onChange={this.handleOptionChange}>
                        <option>Choose...</option>

    			      	{
    			      		courses.map((course) => <option key={course._id} value={course._id}>{course.name}</option>)
    			      	}

    		          </select>
    			    </Form.Field>
    			    <Form.Field disabled={disabled}>
    			      <label htmlFor="video">Cover video</label>
    			      <Input accept=".mp4, .avi. .flv" id="video" placeholder='upload video only' type="file" onChange={this.handleVideoChange}/>
    			    </Form.Field>
    			    <Button type='submit' disabled={disabled} >Create</Button>
    			</Form>
              </div>
              <SideNav />
          </div> 
        );
    }
}

export default withRouter(UploadVideo);

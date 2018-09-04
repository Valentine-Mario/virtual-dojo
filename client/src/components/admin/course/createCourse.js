import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button, Input, TextArea, Select, Progress, Segment, TransitionablePortal, Header, Icon } from 'semantic-ui-react';
import { REQ_GET } from '../../../api';
import axios from 'axios';
import MainNav from '../menu/mainNav';
import SideNav from '../menu/sideNav';

class CreateCourse extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	name: '',
        	description: '',
        	image: null,
        	category: '',
        	categories: [],
        	progress: 0,
        	disabled: false,
        	transition: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        
    	REQ_GET('supercat/get')
    		.then(res => {
                if(res.data){
        			this.setState({
        				categories: res.data
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
    		category: e.target.value
    	})
    }

    handleImageChange = (e) => {
    	this.setState({
    		image: e.target.files[0]
    	})
    }


    /**USING A DIFFERENT API CALL FOR CREATING 	COURSE*/
    handleSubmit = (e) => {
    	e.preventDefault();
    	this.setState({
    		disabled: true
    	})

    	let { name, description, image, category } = this.state;

    	let course = new FormData();
    	course.append('name', name);
    	course.append('description', description);
    	course.append('image', image);
    	course.append('category', category);

    	try {
    		// statements
	    	axios({
			  	method: 'post',
			  	url: 'https://virtualserver.herokuapp.com/category/add',
			  	data: course,
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				onUploadProgress: (progressEvent) => {
			    	const { loaded, total } = progressEvent;
			    	this.setState({
			    		progress: Math.round((loaded/total) * 100)
			    	}, () => console.log((loaded/total)*100))
				}
			})
			.then(res => {
                if(res){
    				this.setState({
    					disabled: false,
    					transition: true,
    					name: '',
    		        	description: '',
    		        	image: null,
    		        	category: '',
    				}, () => this.props.history.push('/admin/dashboard/courses'))
                }else {
                    alert('Error in network connection, try again');
                }
			})
			.then(err => {
				console.log(err);
				this.setState({
					disabled: false,
					name: '',
		        	description: '',
		        	image: null,
		        	category: '',
				})
			})
    	} catch(e) {
    		// statements
    		console.log(e);
    		this.setState({
    			name: '',
	        	description: '',
	        	image: null,
	        	category: '',
	        	progress: 0,
	        	disabled: false,
	        	transition: false
    		})
    	}


    }

    handleClose = () => {
    	setTimeout(() => this.setState({transition: false}), 5000)
    }

    render() {
    	let { name, description, image, loading, category, categories, progress, disabled, transition } = this.state;


        return (
            <div>
                <MainNav />
              <div style={{marginTop: '120px', marginLeft: '200px'}}>

              	<TransitionablePortal onOpen={this.handleClose} open={transition} transition={{animation: 'fly left', duration: 1000}}>
    	          <Segment style={{ right: '2%', position: 'fixed', top: '0%', zIndex: 1000, background: '#61e261bf', width: '40%' }}>
    	            <Header><Icon name="check circle outline" size="big" /></Header>
    	            <p>Course was created successfully.</p>
    	          </Segment>
    	      	</TransitionablePortal>

              	<Form onSubmit={this.handleSubmit} style={{width: '500px', margin: 'auto'}} encType="multipart/form-data">
              		{
              			disabled &&
              				<Progress percent={progress} indicating progress size="small" />
    				}
    			    <Form.Field disabled={disabled}>
    			      <label htmlFor="name">Course Name</label>
    			      <Input id="name" placeholder='name' value={name} onChange={this.handleChange} />
    			    </Form.Field>
    			    <Form.Field disabled={disabled}>
    			      <label htmlFor="description">Course Description</label>
    			      <TextArea id="description" placeholder='Tell us more about this category' value={description} onChange={this.handleChange} />
    			    </Form.Field>
    			    <Form.Field disabled={disabled}>
    			      <label htmlFor="category">Category</label>
    			      <select id="category" value={category} onChange={this.handleOptionChange}>
                         <option>Choose...</option>

    			      	{
    			      		categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)
    			      	}

    		          </select>
    			    </Form.Field>
    			    <Form.Field disabled={disabled}>
    			      <label htmlFor="image">Cover Image</label>
    			      <Input accept=".jpg, .jpeg, .png" id="image" placeholder='upload image only' type="file" onChange={this.handleImageChange}/>
    			    </Form.Field>
    			    <Button type='submit' disabled={disabled}>Create</Button>
    			</Form>
              </div>
              <SideNav />
          </div>  
        );
    }
}

export default withRouter(CreateCourse);

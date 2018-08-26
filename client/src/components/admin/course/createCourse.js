import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button, Input, TextArea, Select } from 'semantic-ui-react';
import { REQ_GET } from '../../../api';
import axios from 'axios';

class CreateCourse extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	name: '',
        	description: '',
        	image: null,
        	category: '',
        	loading: false,
        	categories: []
        }
    }

    componentDidMount() {
    	REQ_GET('supercat/get')
    		.then(res => {
    			this.setState({
    				categories: res.data
    			})
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
    		loading: true
    	})

    	let { name, description, image, category } = this.state;

    	let course = new FormData();
    	course.append('name', name);
    	course.append('description', description);
    	course.append('image', image);
    	course.append('category', category);

    	axios({
		  method: 'post',
		  url: 'https://virtualserver.herokuapp.com/category/add',
		  data: course,

		  config: {
		  	headers: {
		  		'Content-Type': 'multipart/form-data'
		  	}
		  }
		})
		.then(res => {
			this.setState({
				loading: false
			}, () => this.props.history.push('/admin/dashboard/courses'))
		})
		.then(err => {
			console.log(err);
			this.setState({
				loading: false
			})
		})

    }

    render() {
    	let { name, description, image, loading, category, categories } = this.state;


        return (
          <div style={{marginTop: '120px', marginLeft: '200px'}}>
          	<Form loading={loading} onSubmit={this.handleSubmit} style={{width: '500px', margin: 'auto'}} encType="multipart/form-data">
			    <Form.Field>
			      <label htmlFor="name">Course Name</label>
			      <Input id="name" placeholder='name' value={name} onChange={this.handleChange} />
			    </Form.Field>
			    <Form.Field>
			      <label htmlFor="description">Course Description</label>
			      <TextArea id="description" placeholder='Tell us more about this category' value={description} onChange={this.handleChange} />
			    </Form.Field>
			    <Form.Field>
			      <label htmlFor="category">Category</label>
			      <select id="category" value={category} onChange={this.handleOptionChange}>

			      	{
			      		categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)
			      	}

		          </select>
			    </Form.Field>
			    <Form.Field>
			      <label htmlFor="image">Cover Image</label>
			      <Input accept=".jpg, .jpeg, .png" id="image" placeholder='upload image only' type="file" onChange={this.handleImageChange}/>
			    </Form.Field>
			    <Button type='submit'>Create</Button>
			</Form>
          </div>  
        );
    }
}

export default withRouter(CreateCourse);

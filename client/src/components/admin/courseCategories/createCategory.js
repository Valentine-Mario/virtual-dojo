import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button, Input, TextArea } from 'semantic-ui-react';
import { REQ_POST } from '../../../api';
import axios from 'axios';

class CreateCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	name: '',
        	description: '',
        	cover_image: null,
        	loading: false
        }
    }

    handleChange = (e) => {
    	this.setState({
    		[e.target.id]: e.target.value
    	})
    }

    handleImageChange = (e) => {
    	this.setState({
    		cover_image: e.target.files[0]
    	})
    }


    /**USING A DIFFERENT API CALL FOR CREATING CATEGORY*/
    handleSubmit = (e) => {
    	e.preventDefault();
    	this.setState({
    		loading: true
    	})

    	let { name, description, cover_image } = this.state;

    	let category = new FormData();
    	category.append('name', name);
    	category.append('description', description);
    	category.append('cover_image', cover_image);

    	console.log(category)

    	axios({
		  method: 'post',
		  url: 'https://virtualserver.herokuapp.com/supercat/add',
		  data: category,

		  config: {
		  	headers: {
		  		'Content-Type': 'multipart/form-data'
		  	}
		  }
		})
		.then(res => {
			this.setState({
				loading: false
			}, () => this.props.history.push('/admin/dashboard/categories'))
		})

    }

    render() {
    	let { name, description, cover_image, loading } = this.state;


        return (
          <div style={{marginTop: '90px', marginLeft: '200px'}}>
          	<Form loading={loading} onSubmit={this.handleSubmit} style={{width: '500px', margin: 'auto'}} encType="multipart/form-data">
			    <Form.Field>
			      <label htmlFor="name">Category Name</label>
			      <Input id="name" placeholder='name' value={name} onChange={this.handleChange} />
			    </Form.Field>
			    <Form.Field>
			      <label htmlFor="description">Category Description</label>
			      <TextArea id="description" placeholder='Tell us more about this category' value={description} onChange={this.handleChange} />
			    </Form.Field>
			    <Form.Field>
			      <label htmlFor="cover_image">Cover Image</label>
			      <Input accept=".jpg, .jpeg, .png" id="cover_image" placeholder='upload image only' type="file" onChange={this.handleImageChange}/>
			    </Form.Field>
			    <Button type='submit'>Create</Button>
			</Form>
          </div>  
        );
    }
}

export default withRouter(CreateCategory);

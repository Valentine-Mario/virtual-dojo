import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button, Input, TextArea, Progress, Segment, TransitionablePortal, Header, Icon } from 'semantic-ui-react';
import { REQ_POST } from '../../../api';
import axios from 'axios';
import MainNav from '../menu/mainNav';
import SideNav from '../menu/sideNav';

class CreateCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	name: '',
        	description: '',
        	cover_image: null,
            progress: 0,
            disabled: false,
            transition: false
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0);
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
    		disabled: true
    	})

    	let { name, description, cover_image } = this.state;

    	let category = new FormData();
    	category.append('name', name);
    	category.append('description', description);
    	category.append('cover_image', cover_image);

        try {
            // statements
        	axios({
    		    method: 'post',
    		    url: 'https://virtualserver.herokuapp.com/supercat/add',
    		    data: category,
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
                if(res.data){
        			this.setState({
        				disabled: false,
                        transition: true,
        			}, () => this.props.history.push('/admin/dashboard/categories'))
                }else {
                    alert('Error in network connection, try again');
                }
    		})
            .then(err => {
                alert('Error in network connection, try again');
                this.setState({
                    disabled: false,
                })
            })
        } catch(e) {
            // statements
            console.log(e);
            this.setState({
                name: '',
                description: '',
                cover_image: null,
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
    	let { name, description, cover_image, progress, disabled, transition } = this.state;


        return (
            <div>
                <MainNav />
              <div style={{marginTop: '120px', marginLeft: '200px'}}>

                <TransitionablePortal onOpen={this.handleClose} open={transition} transition={{animation: 'fly left', duration: 1000}}>
                  <Segment style={{ right: '2%', position: 'fixed', top: '0%', zIndex: 1000, background: '#61e261bf', width: '40%' }}>
                    <Header><Icon name="check circle outline" size="big" /></Header>
                    <p>Category was created successfully.</p>
                  </Segment>
                </TransitionablePortal>

              	<Form onSubmit={this.handleSubmit} style={{width: '500px', margin: 'auto'}} encType="multipart/form-data">
                    {
                        disabled &&
                            <Progress percent={progress} indicating progress size="small" />
                    }
    			    <Form.Field disabled={disabled}>
    			      <label htmlFor="name">Category Name</label>
    			      <Input id="name" placeholder='name' value={name} onChange={this.handleChange} required />
    			    </Form.Field>
    			    <Form.Field disabled={disabled}>
    			      <label htmlFor="description">Category Description</label>
    			      <TextArea id="description" placeholder='Tell us more about this category' value={description} onChange={this.handleChange} required />
    			    </Form.Field>
    			    <Form.Field disabled={disabled}>
    			      <label htmlFor="cover_image">Cover Image</label>
    			      <Input accept=".jpg, .jpeg, .png" id="cover_image" placeholder='upload image only' type="file" onChange={this.handleImageChange} required />
    			    </Form.Field>
    			    <Button type='submit' disabled={disabled}>Create</Button>
    			</Form>
              </div>
              <SideNav />
          </div>  
        );
    }
}

export default withRouter(CreateCategory);

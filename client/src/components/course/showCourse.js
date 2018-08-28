import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { Responsive, Container, Header, Grid, Divider, Loader, Image } from 'semantic-ui-react';
import Commenting from './comment';
import ListVideo from './listVideo';
import { REQ_GET } from '../../api';
import './course.css';

class ShowCourse extends Component {

	state = {
		course: []
	}

	componentDidMount() {
		REQ_GET(`category/get/${this.props.match.params.id}`)
			.then(res => {
				this.setState({
					course: res.data
				})
			})
	}

	componentDidUpdate(prevProps) {
		if(prevProps.match.url !== this.props.match.url){
			window.location.reload();
		}
	}

    render () {
    	let { course } = this.state;

	    return (
	    	<div>
		    	<Responsive minWidth={Responsive.onlyTablet.minWidth} >
			      <div className='image-wrapper'>
			        <Image src={course.image} size="huge"/>
			      </div>

			      <Grid centered style={{margin: 0, width: '100%'}} >
					    <Grid.Row>
						    <Grid.Column width={16} style={{textAlign: 'center'}}>
						        <div >
								    <Header style={{fontSize: '2.5em', width: '40%', margin: 'auto'}}>
								        <Header.Content>
									      	{course.name}
									      	<Divider />
									      	<Header.Subheader style={{fontSize: '1.5rem'}}>
										        {course.description}
											</Header.Subheader>
									    </Header.Content>
								    </Header>
							    </div>
						    </Grid.Column>
				    	  	<Grid.Column width={16}>

					        	<ListVideo />
						      
					      	</Grid.Column>
					    </Grid.Row>
					</Grid>
			    </Responsive>

			    <Responsive maxWidth={Responsive.onlyMobile.maxWidth} >
				    <div className='image-wrapper'>
				        <Image src={course.image} size="huge"/>
				    </div>

					<Grid centered style={{margin: 0, width: '100%'}}>
					    <Grid.Row columns={1}>
					      	<Grid.Column width={16}>
						        <div style={{textAlign: 'center'}}>
								    <Header>
								        <Header.Content>
									      	{course.name}
									      	<Divider />
									      	<Header.Subheader>
										        {course.description}
											</Header.Subheader>
									    </Header.Content>
								    </Header>
							    </div>
						    </Grid.Column>
					    </Grid.Row>

					    <Grid.Row columns={1}>
					      	<Grid.Column width={16}>
					      		<Container fluid textAlign="justified">

						        	<ListVideo />
							    	
							    </Container>
					      	</Grid.Column>
					    </Grid.Row>
					  </Grid>
			    </Responsive>
		    </div>
	    )
  }
}

export default ShowCourse;
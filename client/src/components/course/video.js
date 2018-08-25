import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { Responsive, Container, Header, Grid, Divider, Loader } from 'semantic-ui-react';
import Commenting from './comment';
import ListVideo from './listVideo';
import './course.css';

class Video extends Component {

	state = {
		video: []
	}

	componentWillMount() {
		fetch(`http://localhost:3004/videos/${this.props.match.params.id}`)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				this.setState({
					video: data
				})
			})
			.catch(err => {
				console.log(err);
			})
	}

	componentDidUpdate(prevProps) {
		if(prevProps.match.url !== this.props.match.url){
			window.location.reload();
		}
	}

    render () {
    	console.log(this.props);
    	let { video } = this.state;

	    return (
	    	<div>
		    	<Responsive minWidth={Responsive.onlyTablet.minWidth} >
			      <div className='player-wrapper'>
			        <ReactPlayer
			          className='react-player'
			          url={video.url}
			          width='100%'
			          height='100%'
			          loop={true}
			          controls={true}
			          onError={() => alert('error while playing video')}
			        />
			      </div>
			      <Grid celled='internally' style={{marginTop: '70px', width: '100%'}} >
					    <Grid.Row>
						    <Grid.Column width={11}>
						        <Container  fluid textAlign="justified" style={{width: '95%'}}>
								    <Header>
								        <Header.Content>
									      	Video Title
									      	<Divider />
									      	<Header.Subheader>
										        {video.title}
											</Header.Subheader>
									    </Header.Content>
								    </Header>
							    </Container>

							    <Container>
							    	<Commenting />
							    </Container>

						    </Grid.Column>
				    	  	<Grid.Column width={5}>

					        	<ListVideo />
						      
					      	</Grid.Column>
					    </Grid.Row>
					</Grid>
			    </Responsive>

			    <Responsive maxWidth={Responsive.onlyMobile.maxWidth} >
				    <div className='player-wrapper'>
				        <ReactPlayer
				          className='react-player'
				          url={video.url}
				          width='100%'
				          height='100%'
				          loop={true}
				          controls={true}
				          onError={() => alert('error while playing video')}
				        />
				    </div>

					<Grid  style={{marginTop: '70px', width: '100%'}}>
					    <Grid.Row columns={1}>
					      	<Grid.Column width={16}>
						        <Container  fluid textAlign="justified" style={{width: '90%'}}>
								    <Header>
								        <Header.Content>
									      	Video Title
									      	<Divider />
									      	<Header.Subheader>
										        {video.title}
											</Header.Subheader>
									    </Header.Content>
								    </Header>
							    </Container>
						    </Grid.Column>
					    </Grid.Row>

					    <Grid.Row columns={1}>
					      	<Grid.Column width={16}>
						        <Container fluid textAlign="justified">
							    	<Commenting />
							    </Container>
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

export default Video;
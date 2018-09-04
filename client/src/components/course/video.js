import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Responsive, Container, Header, Grid, Divider, Loader } from 'semantic-ui-react';
import Commenting from './comment';
import ListVideo from './listVideo';
import { REQ_GET } from '../../api';
import './course.css';
import MenuNav from '../menu/menu';
import Footer from '../menu/footer';

class Video extends Component {

	state = {
		video: []
	}

	componentDidMount() {
		this.getVideo()

		window.scrollTo(0, 0);
	}

	getVideo = () => {
		REQ_GET(`video/get/${this.props.match.params.id_vid}`)
			.then(res => {
				if(res.data){
					this.setState({
						video: res.data
					})
				}else {
					alert('Error in network connection, try again');
				}
			})

	}

	componentDidUpdate(prevProps) {
		if(prevProps.match.url !== this.props.match.url){
			window.location.reload();
		}
	}

    render () {
    	let { video } = this.state;

	    return (
	    	<div>
	    		<MenuNav />
		    	<Responsive minWidth={Responsive.onlyTablet.minWidth} >
			      <div className='player-wrapper'>
			        <ReactPlayer
			          className='react-player'
			          url={video.video}
			          width='100%'
			          height='80%'
			          loop={true}
			          controls={true}
			          onError={() => alert('error while playing video')}
			        />
			      </div>
			      <Grid celled='internally' style={{marginTop: '0px', width: '100%'}} >
					    <Grid.Row>
						    <Grid.Column width={11}>
						        <Container  fluid textAlign="justified" style={{width: '95%'}}>
								    <Header>
								        <Header.Content>
									      	{video.name}
									      	<Divider />
									      	<Header.Subheader>
										        {video.description}
											</Header.Subheader>
									    </Header.Content>
								    </Header>
							    </Container>

							    <Container>
							    	<Commenting videoId={`${this.props.match.params.id_vid}`} />
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
				          url={video.video}
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
									      	{video.name}
									      	<Divider />
									      	<Header.Subheader>
										        {video.description}
											</Header.Subheader>
									    </Header.Content>
								    </Header>
							    </Container>
						    </Grid.Column>
					    </Grid.Row>

					    <Grid.Row columns={1}>
					      	<Grid.Column width={16}>
						        <Container fluid textAlign="justified">
							    	<Commenting videoId={`${this.props.match.params.id_vid}`} />
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
			    <Footer />
		    </div>
	    )
  }
}

export default withRouter(Video);
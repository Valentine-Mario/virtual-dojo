import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { Responsive, Container, Header, Grid, Divider } from 'semantic-ui-react';
import Commenting from './comment';
import ListVideo from './listVideo';
import './course.css';

class Video extends Component {
    render () {
	    return (
	    	<div>
		    	<Responsive minWidth={Responsive.onlyTablet.minWidth} >
			      <div className='player-wrapper'>
			        <ReactPlayer
			          className='react-player'
			          url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
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
										        Domestic dogs inherited complex behaviors, such as bite inhibition, from their wolf
										        ancestors, which would have been pack hunters with complex body language. These
										        sophisticated forms of social cognition and communication may account for their
										        trainability, playfulness, and ability to fit into human households and social situations,
										        and these attributes have given dogs a relationship with humans that has enabled them to
										        become one of the most successful species on the planet today.
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
				          url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
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
										        Domestic dogs inherited complex behaviors, such as bite inhibition, from their wolf
										        ancestors, which would have been pack hunters with complex body language. These
										        sophisticated forms of social cognition and communication may account for their
										        trainability, playfulness, and ability to fit into human households and social situations,
										        and these attributes have given dogs a relationship with humans that has enabled them to
										        become one of the most successful species on the planet today.
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
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Grid,
  Header,
  Icon,
  Card,
  Item,
  Image,
  Responsive,
  Dimmer,
  Loader,
  Button
} from 'semantic-ui-react';
import { REQ_GET } from '../../api';
import AllCoursesHome from '../course/allCoursesHome';
import headerImage from '../../images/header.jpg';
import content from '../../images/content.jpg';
import job from '../../images/job.jpg';
import mentor from '../../images/mentor.jpg';
import student from '../../images/student.png';
import MenuNav from '../menu/menu';
import Footer from '../menu/footer';



export class Home extends PureComponent {

  state = {
    output: [],
    loading: false
  }

  handleSubmit = () => this.props.history.push('/login')

  render() {
    let { loading, output } = this.state;

    const item = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'column',
      paddingTop: '20px'
    }

    const container = {
      marginTop: '70px'
    }

    const headerBackgrd = {
      backgroundImage: `url(${headerImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '620px',
      width: '100%',
      display: 'flex', 
      alignItems: 'center'
    }

    const center = {
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center'
    }

    return (
      <div>
      <MenuNav />
      <Responsive style={{fontFamily: 'Roboto'}}>
        <Grid columns={1} divided style={container}>
          <Grid.Row style={headerBackgrd}>

            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
              <Grid.Column >
                <Grid.Row>
                  <Grid.Column >
                    <Header as='h2' style={{color: 'white', marginLeft: '40px', fontSize: '3em', fontWeight: '500', width: '50%'}}>
                      Learn All You Can
                      <Header.Subheader style={{fontSize: '0.5em', color: 'white', fontWeight: '400'}}>VirtualDojo Offers A Unique Opportunity For You To Learn At Your Own Pace Our Courses are Made For Everyone</Header.Subheader>
                      <Button inverted color='blue' onClick={this.handleSubmit} style={{width: '38%', height: '50px'}} >
                        Get Started
                      </Button>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
            </Responsive>

            <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
              <Grid.Column >
                <Grid.Row>
                  <Grid.Column >
                    <Header as='h2' style={{color: 'white', marginLeft: '40px', fontSize: '2em', fontWeight: '500', width: '70%'}}>
                      Learn All You Can
                      <Header.Subheader style={{fontSize: '0.5em', color: 'white', fontWeight: '400'}}>VirtualDojo Offers A Unique Opportunity For You To Learn At Your Own Pace Our Courses are Made For Everyone</Header.Subheader>
                      <Button color='blue' onClick={this.handleSubmit} style={{width: '38%', height: '50px', marginTop: '10px'}} >
                        Get Started
                      </Button>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
            </Responsive>

          </Grid.Row>
        </Grid>

        <div>
          <Header as='h2' textAlign="center" style={{marginTop: '20px', paddingTop: '20px'}}>
            Testimonial
            <Header.Subheader style={{padding: '10px', paddingBottom: '0px'}}>I'm constantly amazed by the quality of content provided by this platform</Header.Subheader>
          </Header>
          <Grid.Column style={{...center, paddingBottom: '10px'}}>
            -Student
          </Grid.Column>
          <Grid.Column style={center}>
            <Image src={student} />
          </Grid.Column>
        </div>

          <Card.Group centered style={{marginTop: '0px', marginBottom: '20px'}}>

                <AllCoursesHome />
            
          </Card.Group>

          <div>
            <Header as='h2' textAlign="center" color="blue" style={{marginTop: '10px', paddingTop: '10px'}}>
              Changing The Way You Learn
              <Header.Subheader style={{padding: '10px', color: 'black'}}>Master in demand skills, customised learning with personal tutors to help guide you</Header.Subheader>
            </Header>
          </div>

          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Grid style={{padding: '20px', margin: '10px', marginTop: '20px', marginBottom: '20px'}} >

              <Grid.Row columns={2} >
                <Grid.Column style={center}>
                  <div>
                    <Header as='h2' icon textAlign='center' color="blue">
                      <Icon name='computer' circular />
                      <Header.Content>High Definition Content</Header.Content>
                    </Header>
                    High definition tutorial video, different levels of content ranging from basic to advance
                  </div>
                </Grid.Column>
                <Grid.Column style={center}>
                  <Image src={content} rounded />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={2}>
                <Grid.Column style={center}>
                  <Image src={mentor} rounded />
                </Grid.Column>
                <Grid.Column style={center}>
                  <div>
                    <Header as='h2' icon textAlign='center' color="blue">
                      <Icon name='users' circular />
                      <Header.Content>Personal Mentorship</Header.Content>
                    </Header>
                    We help ensure your success. You have access to tutors to aid your learning process
                  </div>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={2}>
                <Grid.Column style={center}>
                  <div>
                    <Header as='h2' icon textAlign='center' color="blue">
                      <Icon name='briefcase' circular />
                      <Header.Content>Job Opportunity</Header.Content>
                    </Header>
                    Begin the journey to your life and career goals. We are affiliated with talent scouts from top industries
                  </div>
                </Grid.Column>
                <Grid.Column style={center}>
                  <Image src={job} rounded />
                </Grid.Column>
              </Grid.Row>

            </Grid>
          </Responsive>

          <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
              <Grid style={{padding: '20px', margin: '10px', marginTop: '20px', marginBottom: '20px'}} >

                <Grid.Row columns={1} >
                  <Grid.Column style={center}>
                    <div>
                      <Header as='h2' icon textAlign='center' color="blue">
                        <Icon name='computer' circular />
                        <Header.Content>High Definition Content</Header.Content>
                      </Header>
                      High definition tutorial video, different levels of content ranging from basic to advance
                    </div>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={1}>
                  <Grid.Column style={center}>
                    <div>
                      <Header as='h2' icon textAlign='center' color="blue">
                        <Icon name='users' circular />
                        <Header.Content>Personal Mentorship</Header.Content>
                      </Header>
                      We help ensure your success. You have access to tutors to aid your learning process
                    </div>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={1}>
                  <Grid.Column style={center}>
                    <div>
                      <Header as='h2' icon textAlign='center' color="blue">
                        <Icon name='briefcase' circular />
                        <Header.Content>Job Opportunity</Header.Content>
                      </Header>
                      Begin the journey to your life and career goals. We are affiliated with talent scouts from top industries
                    </div>
                  </Grid.Column>
                </Grid.Row>

              </Grid>
          </Responsive>


      </Responsive>
      <Footer />
      </div>
    )
  }
}

export default withRouter(Home);
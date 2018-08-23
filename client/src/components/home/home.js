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
import AllCourses from '../course/allCourses';

import headerImage from '../../images/header.jpg';

import { REQ_GET } from '../../api'


export class Home extends PureComponent {

  state = {
    output: [],
    loading: false
  }

  componentDidMount(){
    this.setState({ loading: true })
    fetch('http://localhost:3004/articles')
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res)
        this.setState({
          output: res,
          loading: false
        })
      })


      REQ_GET('users/users')
        .then(res => {
          console.log(res);
        })

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

    let card = output.map((user) => {
        return (
          <Card raised key={user.id} >
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
            <Card.Content>
              <Card.Header>{user.author}</Card.Header>
              <Card.Meta>
                <span className='date'>{user.date}</span>
              </Card.Meta>
              <Card.Description>{user.body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                {user.title}
              </a>
            </Card.Content>
          </Card>
        )
    })

    return (
      <Responsive style={{fontFamily: 'Roboto'}}>
        <Grid columns={1} divided style={container}>
          <Grid.Row style={headerBackgrd}>

            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
              <Grid.Column >
                <Grid.Row>
                  <Grid.Column >
                    <Header as='h2' style={{color: 'white', marginLeft: '40px', fontSize: '3em', fontWeight: '500', width: '50%'}}>
                      Learn All You Can
                      <Header.Subheader style={{fontSize: '0.5em', color: 'white', fontWeight: '400'}}>SchoolFlip Offers A Unique Opportunity For You To Learn At Your Own Pace Our Courses are Made For Everyone</Header.Subheader>
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
                    <Header as='h2' style={{color: 'white', marginLeft: '40px', fontSize: '2em', fontWeight: '500', width: '75%'}}>
                      Learn All You Can
                      <Header.Subheader style={{fontSize: '0.5em', color: 'white', fontWeight: '400'}}>SchoolFlip Offers A Unique Opportunity For You To Learn At Your Own Pace Our Courses are Made For Everyone</Header.Subheader>
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

        <Grid columns={1} divided style={{marginTop: '0px'}}>
          <Grid.Row style={{backgroundColor: 'rgb(255, 255, 255)', height: '100px'}}>
            <Grid.Column style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%'}}>
              <Grid.Row>
                <Grid.Column>
                  <Header as='h3' textAlign='center' style={{fontWeight: '500'}}>
                    Testimonial
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Header as='h4' textAlign='center' style={{fontWeight: '300'}}>
                    &quot;I'm constantly amazed by te quality of content provided by this&quot;
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>

          <Card.Group centered style={{marginTop: '0px', marginBottom: '20px'}}>

            {
              loading ? 
                (
                  <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                  </Dimmer>
                )
                :
                <AllCourses />
            }
            
          </Card.Group>

            <Grid divided='vertically' style={{padding: '20px', margin: '10px'}} >
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Grid.Column>
                <Grid.Column>
                  <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Grid.Column>
              </Grid.Row>
            </Grid>

      </Responsive>
    )
  }
}

export default withRouter(Home);



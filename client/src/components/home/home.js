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
} from 'semantic-ui-react'

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
      height: '620px'
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
            <Grid.Column style={{display: 'flex', alignItems: 'center'}}>
              <Grid.Row>
                <Grid.Column >
                  <Header as='h2' style={{color: 'white', marginLeft: '60px', fontSize: '50px', fontWeight: '500'}}>
                    Learn All You Can
                    <Header.Subheader style={{fontSize: '25px', color: 'white', fontWeight: '400'}}>SchoolFlip Offers A Unique Opportunity</Header.Subheader>
                    <Header.Subheader style={{fontSize: '25px', color: 'white', fontWeight: '400'}}>For You To Learn At Your Own Pace</Header.Subheader>
                    <Header.Subheader style={{fontSize: '25px', color: 'white', fontWeight: '400'}}>Our Courses are Made For Everyone</Header.Subheader>
                    <Button inverted color='blue' onClick={this.handleSubmit} style={{width: '35%', height: '50px'}} >
                      Get Started
                    </Button>
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid columns={1} divided style={{marginTop: '0px'}}>
          <Grid.Row style={{backgroundColor: 'rgb(255, 255, 255)', height: '100px'}}>
            <Grid.Column style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
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

          <Card.Group centered style={{marginTop: '20px', marginBottom: '20px'}}>

            {
              loading ? 
                (
                  <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                  </Dimmer>
                )
                :
                card
            }
            
          </Card.Group>

      </Responsive>
    )
  }
}

export default withRouter(Home);



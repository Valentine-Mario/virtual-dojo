import React, { PureComponent } from 'react'
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
  Loader
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

  render() {
    let { loading } = this.state;

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
      height: '500px'
    }

    let card = this.state.output.map((user) => {
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
      <Responsive>
        <Grid columns={1} divided style={container}>
          <Grid.Row style={headerBackgrd}>
            <Grid.Column>
              <Grid.Row>
                <Grid.Column>This is for info</Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid columns={1} divided style={{marginTop: '0px'}}>
          <Grid.Row style={{background: 'grey', height: '100px'}}>
            <Grid.Column style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
              <Grid.Row>
                <Grid.Column>This is for info</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>This is for image</Grid.Column>
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

export default Home



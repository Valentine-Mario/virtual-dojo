import React, { PureComponent } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Card,
  Item
} from 'semantic-ui-react'
import { fetchGet } from '../../api'


export class Home extends PureComponent {

  state = {
    output: []
  }

  componentDidMount(){
    fetch('http://localhost:3004/articles')
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res)
        this.setState({
          output: res
        })
      })
  }

  render() {
    const item = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'column',
      paddingTop: '20px'
    }
    const container = {
      marginTop: '70px'
    }

    let renderMe = this.state.output.map((user) => {
      return (
        <Card raised>
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
      <div>
        <Grid columns={1} divided style={container}>
          <Grid.Row style={{background: 'lightgrey', height: '500px'}}>
            <Grid.Column>
              <Grid.Row>
                <Grid.Column>This is for info</Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid columns={1} divided style={{...container, marginTop: '0px'}}>
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

            {renderMe}

            
          </Card.Group>

      </div>
    )
  }
}

export default Home



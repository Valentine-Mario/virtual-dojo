import React from 'react';
import {
  Container,
  Grid,
  Header,
  List,
  Segment,
  Item,
  Responsive
} from 'semantic-ui-react';

const Footer = (props) => {
  const container = {
    position: 'absolute',
    width: '100%',
    marginTop: '150px',
    backgroundColor: 'rgba(185, 178, 178, 0.91)',
    height: '500px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  return (
    <Responsive style={container}>
    	<Segment vertical style={{ padding: '0px' }}>
            <Container>
              <Grid inverted stackable style={{width: '100%'}}>
                <Grid.Row>

                  <Grid.Column width={4}>
                    <Header inverted as='h4' content='Who we are' />
                    <List link inverted>
                      <List.Item as='a'>About Us</List.Item>
                    </List>
                  </Grid.Column>

                  <Grid.Column width={4}>
                    <Header inverted as='h4' content='Categories' />
                    <List link inverted>
                      <List.Item as="a" href="/category/5b816980b61f390014118f73">Front-end Development</List.Item>
                      <List.Item as="a" href="/category/5b83767e722fe5001422052f">Back-end Development</List.Item>
                      <List.Item as="a" href="/category/5b8992d822333100145c06c2">Github</List.Item>
                      <List.Item as="a" href="/category/5b8185f2b61f390014118f76">Business</List.Item>
                    </List>
                  </Grid.Column>

                  <Grid.Column width={4}>
                    <Header inverted as='h4' content='Popular Courses' />
                    <List link inverted>
                      <List.Item as="a" href="/auth/course/5b8418366a30a700148dcfa5">Learn React</List.Item>
                      <List.Item as="a" href="/auth/course/5b838db39e81d00014a38c84">Building Real World API</List.Item>
                      <List.Item as="a" href="/auth/course/5b89932922333100145c06c3">Intro to Github</List.Item>
                      <List.Item as="a" href="/auth/course/5b83b9a0775ec90014416940">Getting Started with Javascript</List.Item>
                    </List>
                  </Grid.Column>

                  <Grid.Column width={4}>
                    <Header inverted as='h4' content='Contact Us' />
                    <List link inverted>
                      <List.Item as='a'>+2348103221543</List.Item>
                      <List.Item as='a' href="mailto:info@virtualdojo.com">info@virtualdojo.com</List.Item>
                    </List>
                  </Grid.Column>

                </Grid.Row>

                <Grid.Row >
                	<Grid.Column width={16} style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
	                    <Header inverted as='h4' content={`© ${new Date().getFullYear()} All Rights Reserved`} />
	                </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </Segment>
    </Responsive>
  )
}

export default Footer;
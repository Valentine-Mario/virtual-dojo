import React, { PureComponent, PropTypes } from 'react';
import { REQ_GET } from '../../api';
import { Card, Icon, Image, Dimmer, Loader } from 'semantic-ui-react';

class Category extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            output: [],
            loading: false
        }
    }

    componentDidMount(){
        this.setState({loading: true});
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
        let { loading, output } = this.state;

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
            <Card.Group centered style={{marginTop: '80px', marginBottom: '20px'}}>
            

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
        );
    }
}

export default Category;

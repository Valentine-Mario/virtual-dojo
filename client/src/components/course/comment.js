import React, { Component } from 'react';
import { Button, Comment, Form, Header, Divider } from 'semantic-ui-react';

class Commenting extends Component {
  constructor(props){
    super(props);

    this.state = {
      comments: [
        "The hours, minutes and seconds stand as visible reminders that your effort put them all there. Preserve until your next run, when the watch lets you see how Impermanent your efforts are.",
        "wow this is an awesome tutorial, please share more of those",
        "can you make another video on humans :)"
      ],
      currentComment: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      currentComment: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      comments: [...this.state.comments, this.state.currentComment],
      currentComment: ''
    })
  }

  render(){
    let { comments } = this.state;

    let CurrentComment = comments.map((comment, index) => {
      return(    
        <Comment key={index} >
          <Comment.Avatar as='a' src='https://image.flaticon.com/icons/png/128/145/145852.png' />
          <Comment.Content>
            <Comment.Author>Joe Henderson</Comment.Author>
            <Comment.Metadata>
              <div>1 day ago</div>
            </Comment.Metadata>
            <Comment.Text>
              <p>
                {comment}
              </p>
            </Comment.Text>
          </Comment.Content>
        </Comment>
      )
    })

    return (
        <Comment.Group style={{width: '100%', margin: 'auto', padding: '10px'}}>
          <Header>Video Comment</Header>
          <Divider />
          
          { CurrentComment }

          <Form reply onSubmit={this.handleSubmit}>
            <Form.TextArea onChange={this.handleChange} value={this.state.currentComment} />
            <Button content='Add Comment' labelPosition='left' icon='edit' primary />
          </Form>
        </Comment.Group>
    )
  }
}

export default Commenting;

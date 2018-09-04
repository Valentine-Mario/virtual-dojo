import React, { Component } from 'react';
import MenuNav from '../menu/menu';
import Footer from '../menu/footer';
import { Form, TextArea, Button, Header, Icon, TransitionablePortal, Segment } from 'semantic-ui-react';
import { REQ_POST } from '../../api';

class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            review: '',
            transition: false,
            loading: false
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    handleChange = (e) => {
        this.setState({
            review: e.target.value
        })
    }

    handleReviewSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })

        let { review } = this.state;

        REQ_POST('review/add', {comment: review})
            .then(res => {
                if(res.data){
                    this.setState({
                        review: '',
                        transition: true,
                        loading: false
                    })
                }else {
                    alert('Error in network connection, try again');
                }
            })
    }

    handleClose = () => {
        setTimeout(() => this.setState({transition: false}), 5000)
    }

    render() {
        let { review, transition, loading } = this.state;

        return (
            <div>
                <MenuNav />
            	<div style={{marginTop: '115px', marginBottom: '-25px'}}>

                    <TransitionablePortal onOpen={this.handleClose} open={transition} transition={{animation: 'fly left', duration: 1000}}>
                      <Segment style={{ right: '2%', position: 'fixed', top: '0%', zIndex: 1000, background: '#61e261bf', width: '30%' }}>
                        <Header><Icon name="check circle outline" size="big" /></Header>
                        <p>Thanks, review recieved successfully.</p>
                      </Segment>
                    </TransitionablePortal>

                    <Header as='h2' style={{width: '60%', margin: 'auto', marginBottom: '20px'}}>
                        <Icon name='bullhorn' />
                        <Header.Content>
                            Review
                            <Header.Subheader>Hello, thanks for using our platform</Header.Subheader>
                            <Header.Subheader>Please give us your review of your general experience using the platform</Header.Subheader>
                        </Header.Content>
                    </Header>
                    <Form loading={loading} onSubmit={this.handleReviewSubmit} style={{width: '60%', margin: 'auto'}}>
                        <Form.Field>
                          <TextArea placeholder='Tell us about your experience' value={review} onChange={this.handleChange} style={{height: '150px'}} />
                        </Form.Field>
                        <Button type='submit' color="blue" inverted >Submit</Button>
                    </Form>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Review;

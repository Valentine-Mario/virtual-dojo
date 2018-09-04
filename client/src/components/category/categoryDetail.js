import React, { PureComponent, PropTypes } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { REQ_GET, REQ_POST } from '../../api';
import { Card, Icon, Image, Dimmer, Loader, Header, Segment, Button } from 'semantic-ui-react';
import MenuNav from '../menu/menu';
import Footer from '../menu/footer';

class CategoryDetail extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            loading: false
        }

    }

    componentDidMount(){
        this.setState({loading: true});

        window.scrollTo(0, 0);

          REQ_GET(`supercat/get/${this.props.match.params.id}`)
            .then(res => {
                if(res.data){
                  this.setState({
                      loading: false,
                      categories: res.data
                  })
                }else {
                    alert('Error in network connection, try again');
                }
            })

      }

      handleClick = (course_id) => {
        this.setState({
            loading: true
        })


        //handle all user profile here for taking a course
        const user_id = JSON.parse(localStorage.getItem('user'));

        if(user_id){
            let regCourse = {
                user: user_id[0],
                course: course_id
            }

            try {
                // statements
                REQ_POST('users/buy', regCourse)
                    .then(res => {
                        if(res){
                            if(res.data && (res.data.message == "video purchase succesfully")){
                                this.props.history.push(`/auth/course/${course_id}`);
                            }else {
                                this.props.history.push(`/auth/course/${course_id}`)
                            }
                        }else {
                            alert('Error in network connection, try again');
                        }

                        this.setState({
                            loading: false
                        })
                    })
            } catch(e) {
                // statements
                console.log(e);
            }
        }else {

         this.props.history.push(`/login`);  
          
        }
    }

    render() {
        let { loading, categories } = this.state;

        return (
            <div>
                <MenuNav />
                <div style={{width: '75%', margin: 'auto', marginTop: '100px'}}>
    					    <div style={{fontSize: '25px', fontWeight: '500', textAlign: 'center'}}>{categories.name}</div>

                    <Dimmer inverted active={loading} >        
                        <Loader style={{zIndex: '1', width: '90%', margin: 'auto', marginTop: '90px', marginBottom: '0px'}} inline='centered' />
                    </Dimmer>
                    <Card.Group centered stackable style={{zIndex: '0', width: '100%', margin: 'auto', marginTop: '40px'}}>

                        {
                            categories.courses &&
                                categories.courses.length > 0 ?
                                    categories.courses.map((course) => {
                                        return (
                                            <Card raised key={course._id} style={{width: '31%'}}>
                                              <Card.Content>
                                                <Image floated='right' size='mini' src={course.image} />
                                                <Card.Header>{course.name}</Card.Header>
                                                <Card.Meta></Card.Meta>
                                                <Card.Description>
                                                  {course.description}
                                                </Card.Description>
                                              </Card.Content>
                                              <Card.Content extra>
                                                <div className='ui two buttons'>
                                                  <Button basic color='green' onClick={() => this.handleClick(course._id)}>
                                                    Take Course
                                                  </Button>
                                                </div>
                                              </Card.Content>
                                            </Card>
                                        )
                                    })
                                    :
                                    (<div>No course yet, check back later</div>)
                        }
                    </Card.Group>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(CategoryDetail);

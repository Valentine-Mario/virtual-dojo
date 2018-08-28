import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { List, Image, Loader, Card, Button } from 'semantic-ui-react';
import { REQ_GET, REQ_POST } from '../../api';

class AllCoursesHome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            courses: [],
            loading: false
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        })

        REQ_GET('category/get')
        .then(res => {
          this.setState({
            loading: false,
            courses: res.data
          })
        })
    }

    handleClick = (course_id) => {
        this.setState({
            loading: true
        })

        //handle all user profile here for taking a course
        const user_id = sessionStorage.getItem('user');
        let regCourse = {
            user: user_id,
            course: course_id
        }

        try {
            // statements
            REQ_POST('users/buy', regCourse)
                .then(res => {
                    if(res.data && (res.data.message == "video purchase succesfully")){
                        this.props.history.push(`/auth/course/${course_id}`);
                    }

                    this.setState({
                        loading: false
                    })
                })
        } catch(e) {
            // statements
            console.log(e);
        }
    }

    render() {
        let { courses, loading } = this.state;

        return (
            <div>
                <Card.Group centered style={{zIndex: '0', width: '90%', margin: 'auto', marginTop: '70px'}}>
                    { loading ? 
                        <Loader active inline='centered' />
                        :
                        courses.map((course) => {
                            return (
                                <Card>
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
                        })}
                </Card.Group>
            </div>
        );
    }
}

export default withRouter(AllCoursesHome);
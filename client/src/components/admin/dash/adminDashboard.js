import React, { Component } from 'react';
import { Card, Feed, Loader } from 'semantic-ui-react';
import MainNav from '../menu/mainNav';
import SideNav from '../menu/sideNav';
import { REQ_GET } from '../../../api';

class AdminDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latestUsers: [],
            latestVideos: [],
            latestCourse: [],
            latestCategory: [],
            latestComment: [],
            userLoading: false,
            videoLoading: false,
            courseLoading: false,
            categoryLoading: false,
            commentLoading: false,
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0);

        this.setState({
            userLoading: true,
            videoLoading: true,
            courseLoading: true,
            categoryLoading: true,
            commentLoading: true
        })

        REQ_GET(`users/getlatest/4`)
            .then(res => {
                if(res.data){
                    this.setState({
                        latestUsers: res.data,
                        userLoading: false
                    })
                }else {
                    alert("Error in network connection, try again");
                }
            })

        REQ_GET(`video/getlatest/4`)
        .then(res => {
            if(res.data){
                this.setState({
                    latestVideos: res.data,
                    videoLoading: false
                })
            }else {
                alert("Error in network connection, try again");
            }
        })

        REQ_GET(`category/getlatest/4`)
        .then(res => {
            if(res.data){
                this.setState({
                    latestCourse: res.data,
                    courseLoading: false
                })
            }else {
                alert("Error in network connection, try again");
            }
        })

        REQ_GET(`supercat/getlatest/4`)
        .then(res => {
            if(res.data){
                this.setState({
                    latestCategory: res.data,
                    categoryLoading: false
                })
            }else {
                alert("Error in network connection, try again");
            }
        })

        REQ_GET(`comment/getlatest/4`)
        .then(res => {
            if(res.data){
                this.setState({
                    latestComment: res.data,
                    commentLoading: false
                })
            }else {
                alert("Error in network connection, try again");
            }
        })
    }

    render() {
        let { latestUsers, latestVideos, latestCourse, latestCategory, latestComment, userLoading, videoLoading, courseLoading, categoryLoading, commentLoading } = this.state;

        let cardStyle = {
            display: 'inline-block',
            margin: '10px',
            width: '31%'
        }

        return (
            <div>
                <MainNav />
                <div style={{marginTop: '100px', marginLeft: '160px', width: '80%', display: 'flex', alignItems: 'baseline', flexWrap: 'wrap'}}>
                    
                        <Card raised style={cardStyle}>
                            <Card.Content>
                              <Card.Header>Recent Users</Card.Header>
                            </Card.Content>
                            <Card.Content>
                                <Feed>
                                    <Loader active={userLoading} />
                                    {
                                        latestUsers &&
                                            latestUsers.length > 0 ?
                                                (
                                                    latestUsers.map((user) => {
                                                        return (
                                                            <Feed.Event key={user._id}>
                                                              <Feed.Label image={user.profile_pics} />
                                                              <Feed.Content>
                                                                <Feed.Date content={user.time} />
                                                                <Feed.Summary style={{fontWeight: '500'}}>
                                                                  {`${user.firstName} ${user.lastName}`}
                                                                </Feed.Summary>
                                                              </Feed.Content>
                                                            </Feed.Event>
                                                        )
                                                    })
                                                )
                                                :
                                                (<div>No new user added</div>)
                                    }
                                </Feed>
                            </Card.Content>
                        </Card>

                        <Card raised style={cardStyle}>
                            <Card.Content>
                              <Card.Header>Recent Videos</Card.Header>
                            </Card.Content>
                            <Card.Content>
                              <Feed>
                                <Loader active={videoLoading} />
                                {
                                    latestVideos &&
                                        latestVideos.length > 0 ?
                                            (
                                                latestVideos.map((video) => {
                                                    return (
                                                        <Feed.Event key={video._id}>
                                                          <Feed.Label icon="video" />
                                                          <Feed.Content>
                                                            <Feed.Date content={video.time} />
                                                            <Feed.Summary style={{fontWeight: '500'}}>
                                                              {video.name}
                                                            </Feed.Summary>
                                                          </Feed.Content>
                                                        </Feed.Event>
                                                    )
                                                })
                                            )
                                            :
                                            (<div>No new video added</div>)
                                }
                              </Feed>
                            </Card.Content>
                        </Card>

                        <Card raised style={cardStyle}>
                            <Card.Content>
                              <Card.Header>Recent Course</Card.Header>
                            </Card.Content>
                            <Card.Content>
                              <Feed>
                                <Loader active={courseLoading} />
                                {
                                    latestCourse &&
                                        latestCourse.length > 0 ?
                                            (
                                                latestCourse.map((course) => {
                                                    return (
                                                        <Feed.Event key={course._id}>
                                                          <Feed.Label image={course.image} />
                                                          <Feed.Content>
                                                            <Feed.Summary style={{fontWeight: '500'}}>
                                                              {course.name}
                                                            </Feed.Summary>
                                                          </Feed.Content>
                                                        </Feed.Event>
                                                    )
                                                })
                                            )
                                            :
                                            (<div>No new course added</div>)
                                }
                              </Feed>
                            </Card.Content>
                        </Card>

                        <Card raised style={cardStyle}>
                            <Card.Content>
                              <Card.Header>Recent Category</Card.Header>
                            </Card.Content>
                            <Card.Content>
                              <Feed>
                                <Loader active={categoryLoading} />
                                {
                                    latestCategory &&
                                        latestCategory.length > 0 ?
                                            (
                                                latestCategory.map((category) => {
                                                    return (
                                                        <Feed.Event key={category._id}>
                                                          <Feed.Label image={category.cover_image} />
                                                          <Feed.Content>
                                                            <Feed.Summary style={{fontWeight: '500'}}>
                                                              {category.name}
                                                            </Feed.Summary>
                                                          </Feed.Content>
                                                        </Feed.Event>
                                                    )
                                                })
                                            )
                                            :
                                            (<div>No new category added</div>)
                                }
                              </Feed>
                            </Card.Content>
                        </Card>

                        <Card raised style={cardStyle}>
                            <Card.Content>
                              <Card.Header>Recent Comment</Card.Header>
                            </Card.Content>
                            <Card.Content>
                              <Feed>
                                <Loader active={commentLoading} />
                                {
                                    latestComment &&
                                        latestComment.length > 0 ?
                                            (
                                                latestComment.map((comment) => {
                                                    return (
                                                        <Feed.Event key={comment._id}>
                                                          <Feed.Label icon="comment alternate outline" />
                                                          <Feed.Content>
                                                            <Feed.Summary style={{fontWeight: '500'}}>
                                                              {comment.comment}
                                                            </Feed.Summary>
                                                            <Feed.Extra text>{comment.user_id.firstName}</Feed.Extra>
                                                          </Feed.Content>
                                                        </Feed.Event>
                                                    )
                                                })
                                            )
                                            :
                                            (<div>No new comment was made</div>)
                                }
                              </Feed>
                            </Card.Content>
                        </Card>
                    
                </div>
                <SideNav />
            </div>
        )
    }
}

export default AdminDashboard;
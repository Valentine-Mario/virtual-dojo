import React, { Component } from 'react';
// import logo from './logo.svg';
import './home.css';
import {Link} from 'react-router-dom';
import { Jumbotron } from 'react-bootstrap'; 
import CustomNavbar from './customNavBar';
import Footer from './footer';
import pic1 from './pictures/pic1.jpg';
import video1 from './pictures/video1.png';
import video2 from './pictures/video2.png';
import video3 from './pictures/video3.png';
import video4 from './pictures/video4.png';
import video5 from './pictures/video5.png';
import video6 from './pictures/video6.png';
import student1 from './pictures/student1.png';
import student2 from './pictures/student2.png';
import student3 from './pictures/student3.png';
import ContentVideo from './pictures/ContentVideo.png';
import ContentVideo2 from './pictures/ContentVideo2.jpg';
import ContentVideo3 from './pictures/ContentVideo3.png';
import briefcase from './pictures/briefcase-24.png';
import definedVideo from './pictures/definedVideo.png'; 
import mentor from './pictures/mentor.png'; 
import { Container, Row, Col } from 'reactstrap';
// import { Slide } from 'react-slideshow-image';
// import mentor1 from './pictures/mentor1.jpg';
// import mentor2 from './pictures/mentor2.jpg';
// import mentor3 from './pictures/mentor3.jpg';
// import mentor4 from './pictures/mentor4.png';
// import mentor5 from './pictures/mentor5.jpg';



// let images = [
//     mentor1,
//     mentor2,
//     mentor3,
//     mentor4,
//     mentor5
// ];


class Home extends Component {
    render() {
      return (
        <div className="App">
            <CustomNavbar/>
            <div> 
           <img src={pic1} alt="ultron" className="landing"/> 
              <div className="landingText">
                  <h1 >Learn All You Can</h1> 
              <p>Virtual Dojo offers a Unique Oppurtunity</p>
              <p>For You to Learn At Your Own Pace.</p>
              <p>Our Courses Are Made For Everyone</p>
              <button className="getStarted">Get Started</button>
              </div>
           </div>  
         <Jumbotron className="jumbotron">
           <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
             <Link to="./adminDash"><strong>Testimonial</strong></Link>
             <p>"I'm constantly amazed by the quality of content provided by this platform"</p>
             <p>-student</p> 
             <img src={student1} className="student1" alt="student"/>
             <img src={student2} className="student2" alt="student"/>
             <img src={student3} className="student3" alt="student"/>
          </Jumbotron> 
          <div className="background">
          <Container> 
          <Row style={{width: "100%"}}>
          <Col sm={{ size: 'auto', offset: 1 }} className="video">
              <img src={video1} alt="content" className="content"/>
              <strong><p className="contentWrite">Exceptional Writing</p></strong>
              <ion-icon name="star" class="star"></ion-icon>
              <ion-icon name="star" class="star"></ion-icon>
              <ion-icon name="star" class="star"></ion-icon> 
              <ion-icon name="star" class="star"></ion-icon>
              <ion-icon name="star-outline" class="star"></ion-icon>
          </Col>
          <Col sm={{ size: 'auto', offset: 1 }} className="video">
              <img src={video2} alt="content" className="content"/>
              <strong><p className="contentWrite">Artificial Intelligence</p></strong>
              <ion-icon name="star" class="star"></ion-icon>
              <ion-icon name="star" class="star"></ion-icon>
              <ion-icon name="star"  class="star"></ion-icon> 
              <ion-icon name="star"  class="star"></ion-icon>
              <ion-icon name="star-outline"  class="star"></ion-icon>
          </Col>
          <Col sm={{ size: 'auto', offset: 1 }} className="video">
              <img src={video3} alt="content" className="content"/> 
              <strong><p className="contentWrite">Project Management</p></strong>
              <ion-icon name="star" class="star"></ion-icon>
              <ion-icon name="star" class="star"></ion-icon>
              <ion-icon name="star" class="star"></ion-icon> 
              <ion-icon name="star" class="star"></ion-icon>
              <ion-icon name="star-outline" class="star"></ion-icon>
          </Col>
        </Row>
        <Row style={{width: "101%"}}>>
          <Col sm={{ size: 'auto', offset: 1 }} className="video">
              <img src={video4} alt="content" className="content"/> 
              <strong><p className="contentWrite">Business Law</p></strong>
              <ion-icon name="star" class="star"></ion-icon>
              <ion-icon name="star" class="star"></ion-icon>
              <ion-icon name="star" class="star"></ion-icon> 
              <ion-icon name="star" class="star"></ion-icon>
              <ion-icon name="star-outline" class="star"></ion-icon>
          </Col>
          <Col sm={{ size: 'auto', offset: 1 }} className="video">
             <img src={video5} alt="content" className="content"/> 
             <strong><p className="contentWrite">Product Design</p></strong>
             <ion-icon name="star" class="star"></ion-icon>
              <ion-icon name="star" class="star"></ion-icon>
              <ion-icon name="star" class="star"></ion-icon> 
              <ion-icon name="star" class="star"></ion-icon>
              <ion-icon name="star" class="star"></ion-icon>
          </Col>
          <Col sm={{ size: 'auto', offset: 1 }} className="video">
               <img src={video6} alt="content" className="content"/> 
               <strong><p className="contentWrite">Software Development</p></strong>
               <ion-icon name="star" class="star"></ion-icon>
              <ion-icon name="star" class="star"></ion-icon>
              <ion-icon name="star" class="star"></ion-icon> 
              <ion-icon name="star" class="star"></ion-icon>
              <ion-icon name="star" class="star"></ion-icon>
          </Col>
        </Row>
      </Container>
      </div> 
      <span className="Courses">
          <p className="seeCourses">
          See all we offer
          </p>
          <ion-icon name="play-circle" class="play"></ion-icon>
      </span> 
      <br/>
      <br/>
      <div className="mentor"><div>
                {/* <Slide 
                    images={images}
                    duration={5000}
                    transitionDuration={1000}
                    style={{width: "15px", height: "10px"}}
                    /> */}
                    </div>
       </div> 
       <div  style = {{backgroundColor: "#E5E5E5"}}>
        <span className="changing"><p className="change"> Changing The Way You Learn</p> 
            <p>Master in-demand skills,customized learning with personal tutors to help<br/> guide you.</p></span>
            <Container> 
                <Row>
                    <Col sm={{ size: '5', offset: 0.5 }} className="tintWrite">
                            <div className="text"><div className="hintLaptop"><img src={definedVideo} class="laptop1" alt="definedVideo"/></div><br/> 
                            <p style={{color:'blue', fontSize: '20px'}}>High Definition Content</p>
                            <p style={{fontFamily: "Roboto", fontSize: '17px'}}>High definition video tutorials, different levels of <br/>
                            content ranging from basic to advanced</p></div> 
                    </Col>
                    <Col sm={{ size: '5', offset: 0.5}} className="tint">
                            <img src={ContentVideo} className="Content" alt="Content"/> 
                    </Col> 
                </Row>
                <Row>
                    <Col sm={{ size: '3', offset: 0.5 }} className="tint2">
                            <img src={ContentVideo2} className="Content2" alt="Content"/> 
                    </Col>
                    <Col sm={{ size: '7', offset: 0.5}} className="tintWrite2">
                            <div className="text2"><div className="hintLaptop"><img src={mentor}  class="laptop" alt="mentor"/></div><br/> 
                            <p style={{color:'blue', fontSize: '20px'}}>Personal Mentorship</p>
                            <p style={{fontFamily: "Roboto", fontSize: '17px'}}>We help ensure your sucess. Have access to<br/>
                            tutors to aid your learning process</p></div>
                    </Col>
                </Row>
                <Row> 
                    <Col sm={{ size: '5', offset: 0.5 }} className="tintWrite">
                            <div className="text"><div className="hintLaptop">
                            <img src={briefcase} class="laptop" alt="briefcase"/> 
                            </div><br/> 
                            <p style={{color:'blue', fontSize: '20px'}}>Job Oppurtunities</p>
                            <p style={{fontFamily: "Roboto", fontSize: '17px'}}>Begin the journey to your life and career<br/>
                            goals, we are affliated with talent scouts from <br/> top industries</p></div> 
                    </Col>
                    <Col sm={{ size: '5', offset: 0.5}} className="tint">
                            <img src={ContentVideo3} className="Content" alt="Content"/> 
                    </Col>
                </Row>
            </Container>
            </div>
            
          <Footer/>
     </div> 

      );
    }
  }
  
  export default Home;
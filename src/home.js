import React, { Component } from 'react';
// import logo from './logo.svg';
import './home.css';
import { Jumbotron } from 'react-bootstrap'; 
// import { Button } from 'reactstrap';
import CustomNavbar from './customNavBar';
import pic1 from './pic1.jpg';
import video1 from './video1.png';
import video2 from './video2.png';
import video3 from './video3.png';
import video4 from './video4.png';
import video5 from './video5.png';
import video6 from './video6.png';
import student1 from './student1.png';
import student2 from './student2.png';
import student3 from './student3.png';
import ContentVideo from './ContentVideo.png';
import ContentVideo2 from './ContentVideo2.jpg';
import ContentVideo3 from './ContentVideo3.png';
// import { Fastar } from 'react-icons/fa'; 
import { Container, Row, Col } from 'reactstrap';

class Home extends Component {
    render() {
      return (
        <div className="App">
            <CustomNavbar/>
            <div>
           <img src={pic1} alt="ultron" className="landing"/> 
              <span className="landingText">
                  <h1 >Learn All You Can</h1> 
              <p>Virtual Dojo offers a Unique Oppurtunity</p>
              <p>For You to Learn At Your Own Pace.</p>
              <p>Our Courses Are Made For Everyone</p>
              <button className="getStarted">Get Started</button>
              </span>
           </div>  
           <Jumbotron className="jumbotron">
           <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
             <strong>Testimonial</strong>
             <p>"I'm constantly amazed by the quality of content provided by this platform"</p>
             <p>-student</p> 
             <img src={student1} className="student1" alt="student"/>
             <img src={student2} className="student2" alt="student"/>
             <img src={student3} className="student3" alt="student"/>
          </Jumbotron> 
          <Container className="background">
          <Row>
          <Col sm={{ size: 'auto', offset: 1 }} className="video">
              <img src={video1} alt="content" className="content"/>
              <strong><p className="contentWrite">Exceptional Writing</p></strong>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon> 
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star-outline"></ion-icon>
          </Col>
          <Col sm={{ size: 'auto', offset: 1 }} className="video">
              <img src={video2} alt="content" className="content"/>
              <strong><p className="contentWrite">Artificial Intelligence</p></strong>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon> 
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star-outline"></ion-icon>
          </Col>
          <Col sm={{ size: 'auto', offset: 1 }} className="video">
              <img src={video3} alt="content" className="content"/> 
              <strong><p className="contentWrite">Project Management</p></strong>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon> 
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star-outline"></ion-icon>
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 'auto', offset: 1 }} className="video">
              <img src={video4} alt="content" className="content"/> 
              <strong><p className="contentWrite">Business Law</p></strong>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon> 
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star-outline"></ion-icon>
          </Col>
          <Col sm={{ size: 'auto', offset: 1 }} className="video">
             <img src={video5} alt="content" className="content"/> 
             <strong><p className="contentWrite">Product Design</p></strong>
             <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon> 
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
          </Col>
          <Col sm={{ size: 'auto', offset: 1 }} className="video">
               <img src={video6} alt="content" className="content"/> 
               <strong><p className="contentWrite">Software Development</p></strong>
               <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon> 
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
          </Col>
        </Row>
      </Container>
      <span className="Courses">
          <p className="seeCourses">
          See all we offer
          </p>
          <ion-icon name="play-circle" class="play"></ion-icon>
      </span> 
      <br/>
      <br/>
      <div className="mentor">
             <strong>Testimonial</strong>
             <p>"I'm constantly amazed by the quality of content provided by this platform"</p>
             <p>-student</p> 
        </div> 
        <span className="changing"><p className="change"> Changing The Way You Learn</p> 
            <p>Master in-demand skills,customized learning with personal tutors to help<br/> guide you.</p></span>

            <div className="hint1">
                <div className="hintContent">
                    <div className="hintLaptop"><ion-icon class="laptop" name="laptop"></ion-icon></div><br/> 
                    <p>High Definition Content</p>
                     <p>High definition video tutorials, different levels of <br/>
                     content ranging from basic to advanced</p> 
                </div> 
               <div className="hintVideo"> 
                   <img src={ContentVideo} className="Content" alt="Content"/> 
               </div> 
            </div>    
           
            <div className="hint1">
                <div className="hintContent2">
                    <div className="hintLaptop"><ion-icon class="laptop" name="contacts"></ion-icon></div><br/> 
                    <p>High Definition Content</p>
                     <p>High definition video tutorials, different levels of <br/>
                     content ranging from basic to advanced</p> 
                </div> 
               <div className="hintVideo2"> 
                   <img src={ContentVideo2} className="Content" alt="Content"/> 
               </div> 
            </div> 

          <div className="hint1">
                <div className="hintContent3">
                    <div className="hintLaptop"><ion-icon class="laptop" name="laptop"></ion-icon></div><br/> 
                    <p>High Definition Content</p>
                     <p>High definition video tutorials, different levels of <br/>
                     content ranging from basic to advanced</p> 
                </div> 
               <div className="hintVideo3"> 
                   <img src={ContentVideo3}className="Content" alt="Content"/> 
               </div> 
            </div> 

      </div>

      );
    }
  }
  
  export default Home;
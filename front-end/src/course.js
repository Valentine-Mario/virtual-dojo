import React, { Component } from 'react';
import './course.css';
import courseDetail from './pictures/courseDetail.png';
import coursePlayIcon from './pictures/coursePlayIcon.png';
import backToCourse from './pictures/backToCourse.png';
import search from './pictures/search.png';
import student1 from './pictures/student1.png';
import student3 from './pictures/student3.png';


class Course extends Component {
  render() {
    return (
        <div className="coursePage">
            <div className="courseName">
                <div className="CourseInfo">
                  <img src={backToCourse} alt="backToCourse"/>
                  <span style={{fontSize:"9px"}}>Back to Course</span><br/>
                  <img src={search}  style={{float: "right", paddingRight: "120px"}} alt="search"/>
                  <span style={{fontSize:"25px"}}>Product Design</span><br/> 
                  <span>Introduction to Product Design</span>
                  
                </div>
            </div> 
            <div className="courseDetails">
                <img src={courseDetail}  className="courseVideo" alt="coursedetial"/>
               <img src={coursePlayIcon}  className="coursePlayIcon" alt="coursedetial"/> 
            </div> 
            <div className="courseOverview">
            <div className="leftOverview">
                <input placeholder="Search Chapter" className="searchChapter"/>
                <div> 
                    <strong><span>1 &nbsp; &nbsp; Course Overview</span></strong>
                    <div style={{paddingLeft:"28px"}}>10 mins</div> 
                </div>
                <div> 
                    <strong><span>2 &nbsp; &nbsp; Introduction</span></strong>
                    <div style={{paddingLeft:"28px"}}>25 mins</div> 
                </div>
                <div> 
                    <strong><span>3 &nbsp; &nbsp; Building Great Products</span></strong>
                    <div style={{paddingLeft:"28px"}}>15 mins</div> 
                </div>
                <div> 
                    <strong><span>4 &nbsp; &nbsp;From Ideation To Validation</span></strong>
                    <div style={{paddingLeft:"28px"}}>35 mins</div> 
                </div>
                <div> 
                    <strong><span>5 &nbsp; &nbsp; Personas And User Flows</span></strong>
                    <div style={{paddingLeft:"28px"}}>15 mins</div> 
                </div>
                <div> 
                    <strong><span>6 &nbsp; &nbsp; Home Page Design</span></strong>
                    <div style={{paddingLeft:"28px"}}>25 mins</div> 
                </div>
                <div> 
                    <strong><span>7 &nbsp; &nbsp; Course Conclusion</span></strong>
                    <div style={{paddingLeft:"28px"}}>10 mins</div> 
                </div>
            </div>

            <div className="rightOverview">
                  <div> 
                       <strong><span>Reviews</span></strong>
                       <p>Personas and User Flows<br/>10mins</p>
                  </div>
                  <div>
                      <div>
                          <span><img src={student1} className="student" alt="student1"/></span>
                          <span> &nbsp;Quite comprehensive, the tutors explained in simple terms.</span>
                      </div><br/>  
                      <div>
                            <span><img src={student3} className="student" alt="student1"/></span>
                            <span> &nbsp;Loved the quality of the videos, they had no distractions.</span>
                      </div>
                  </div>
            </div>

            </div> 
      </div>
    );
  }
}

export default Course;
     
            
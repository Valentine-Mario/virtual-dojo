import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import admin from './pictures/student3.png';
import './adminDash.css';


class AdminDash extends Component { 
  render() {
    return (
      <div className="adminPage">
        <div className="adminHeading">
            <div className="adminName"><strong><p >Nnenna Admin<br/> Logout</p></strong></div>
            <img src={admin} className="adminPic" alt="admin"/>
        </div>
        <div className="adminNav">
                <Nav vertical>
                <NavItem style={{backgroundColor: "rgba(53, 143, 182, 0.61)"}}> 
                    <NavLink href="./adminDash">Dash</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="./adminCourse">Course</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="adminUser">User</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="adminUpload">Upload</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="adminCategories">Create Categories</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Setting</NavLink>
                </NavItem>
                </Nav>
        </div>
        <div className="adminBody">
            <div className="adminSearch" >
                <strong><span>Admin Dash</span></strong> 
                <input className="search" placeholder="Search Training"/>
            </div>
            <div>
                <div class="row">
                    <div className="column" >
                        <strong><p>Display from:</p></strong>
                        <p>8/10/2018</p>
                    </div>
                    <div className="column">
                        <strong><p>To:</p></strong>
                        <p>9/10/2018</p>
                    </div>
                </div>
                <div><button style={{borderRadius: "10px"}}>Update</button></div>
            </div>
            <div>
                <h5>Most registered Training</h5>
                <table>
                <tr>
                    <th>Course Name</th>
                    <th>Number of Registration</th>
                    <th>Date</th>
                </tr>
                <tr>
                    <td>Artificial Intelligence</td>
                    <td>20</td>
                    <td>12/10/2018</td>
                </tr>
                <tr>
                    <td>Project Management</td>
                    <td>15</td>
                    <td>17/10/2018</td>
                </tr>
                <tr>
                    <td>Software Development</td>
                    <td>15</td>
                    <td>23/10/2018</td>
                </tr>
                <tr>
                    <td>Business Intelligence</td>
                    <td>13</td>
                    <td>27/10/2018</td>
                </tr>
               </table>
            </div><br/><br/><br/><br/>
            <div>
                <h5>New Content Uploaded over the last 7 days</h5>
                <table>
                <tr>
                    <th>Course Name</th>
                    <th>Date</th>
                    <th>Author</th>
                </tr>
                <tr>
                    <td>Exceptional Writing</td>
                    <td>6/10/2018</td>
                    <td>Jacinta Mba</td>
                </tr>
                <tr>
                    <td>Business law</td>
                    <td>8/10/2018</td>
                    <td>Luke Mmamel</td>
                </tr>
                <tr>
                    <td>Mathematics</td>
                    <td>12/10/2018</td>
                    <td>Jude Ogini</td>
                </tr>
                <tr>
                    <td>Business Intelligence</td>
                    <td>13</td>
                    <td>27/10/2018</td>
                </tr>
               </table>
            </div>
            
        </div> 
    </div>
    );
  }
}

export default AdminDash;
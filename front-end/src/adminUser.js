import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import admin from './pictures/student3.png';
import './adminDash.css';


class AdminCourse extends Component { 
  render() {
    return (
      <div className="adminPage">
        <div className="adminHeading">
            <div className="adminName"><strong><p >Nnenna Admin<br/> Logout</p></strong></div>
            <img src={admin} className="adminPic" alt="admin"/>
        </div>
        <div className="adminNav">
        <Nav vertical>
                <NavItem > 
                    <NavLink href="./adminDash">Dash</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="./adminCourse">Course</NavLink>
                </NavItem> 
                <NavItem style={{backgroundColor: "rgba(53, 143, 182, 0.61)"}}>
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
                
        </div> 
    </div>
    );
  }
}

export default AdminCourse;
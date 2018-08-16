import React, { Component } from 'react';
import './categories.css';
import CustomNavBar from './customNavBar';
import Footer from './footer'; 
import category1pic from './pictures/category1.png'; 
import category2pic from './pictures/category2.png';
import category3pic from './pictures/category3.png'; 

class Categories extends Component { 
  render() {
    return (
      <div className="fullPage">

          <div className="beginning">
              <CustomNavBar/>
          </div>

          <div className="center">
            <p className="explore">Explore our different Category</p>
            <div className="category1">
                <img src={category1pic} className="category1pic" alt="category1"/>
                <p className="categoryName">Basic Education</p>
            </div> 
            <div className="category2">
                <img src={category2apic} className="category2pic" alt="category2"/>
                <p className="categoryName">Business</p>
            </div>
            <div className="category3">
                <img src={category3pic} className="category3pic" alt="category3"/>
                <p className="categoryName">Technology</p>   
            </div>
            
          </div> 

          <div className="ending">
              <Footer className="footerCategory"/> 
          </div> 
    </div>
    );
  }
}

export default Categories;
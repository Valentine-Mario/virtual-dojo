import React from 'react';
import Video from './video';
import MenuNav from '../menu/menu';
import Footer from '../menu/footer';
import ShowCourse from './showCourse';

const Course = (props) => {

	window.scrollTo(0, 0);
	
	return (
        <div>
	        <MenuNav />
        	<ShowCourse {...props} />
        	<Footer />
        </div>
    );
}

export default Course;

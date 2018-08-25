import React from 'react';
import Video from './video';
import MenuNav from '../menu/menu';
import Footer from '../menu/footer';

const Course = (props) => {
	
	return (
        <div>
	        <MenuNav />
        	<Video {...props} />
        	<Footer />
        </div>
    );
}

export default Course;

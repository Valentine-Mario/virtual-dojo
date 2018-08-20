import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './footer.css'; 

class Footer extends React.Component{
    render(){
        return(
            <div className="footer"> 
                <Container> 
                    <Row ><p className="row1">E-course and workshop registration is now open</p></Row>
                    <Row className="row2">
                        <Col className="row2col1"><button className="learnMore">Learn more</button></Col>
                        <Col className="row2col2"><button className="signUp">Sign Up</button> </Col> 
                    </Row>
                    <Row className="row3">
                        <Col className="row3col1">
                            <p>WHO WE ARE<br/> Company<br/>mission<br/>vision<br/>Goal</p>
                        </Col> 
                        <Col className="row3col2">
                            <p>CATEGORIES<br/>Basic Education<br/>Technology<br/>Business</p>
                        </Col>
                        <Col className="row3col3">
                            <p>POPULAR COURSES<br/>Front End web development<br/>Product Designer<br/>Business Law<br/>
                            Project Management<br/>Artificial Intelligent</p>
                        </Col>
                        <Col className="row3col4">
                            <p>CONTACT<br/>www.schoolfflip.com<br/>+2349056098712<br/>info@schoolflip.com</p>
                        </Col>
                        <Col className="row3col5">
                            <p>SUBSCRIBE<br/>Enter your e-mail to get<br/>notification about your course<br/></p>
                            <input placeholder="E-MAIL"/>
                            <button style={{backgroundColor: 'blue', border: '1px solid blue', color: 'white'}}>Submit</button>
                        </Col> 
                    </Row>
                
                
                
                
                </Container>
            </div>
        );
    }
}

export default Footer;
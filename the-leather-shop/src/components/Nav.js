import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'



export default function Home() {
    return (
        <React.Fragment>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">
                    <img
                        src="./images/logo.png"
                        width="150"
                        height="150"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="">Link</Nav.Link>
    
                    </Nav>
                    
                </Navbar.Collapse>
            </Navbar>
            
        </React.Fragment>
    )
}
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
                        width="100"
                        height="100"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="products/products">Products</Nav.Link>
                        <Nav.Link href="allproducts">All Products</Nav.Link>

                    </Nav>

                </Navbar.Collapse>
            </Navbar>

        </React.Fragment>
    )
}
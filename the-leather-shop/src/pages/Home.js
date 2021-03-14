import React, { useState } from 'react'
import axios from 'axios'

import {
    useHistory,
} from "react-router-dom"

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'

const BASE_API_URL = 'https://8080-a3d5bfe8-e545-435f-aa79-ead619c8cac6.ws-us03.gitpod.io/api'

export default function Home() {
    const [form, setForm] = useState({
        'email': "",
        'password': "",
    })

    const history = useHistory();

    function updateFormField(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    async function submitLogin() {
        // check url
        let response = await axios.post(`${BASE_API_URL}/user/login`, {
            'email': form.email,
            'password': form.password
        });
        if (response.data.token) {
            history.push('/products', {
                token: response.data.token
            })
        }
        else {
            alert("Incorrect email or password")
        }
    }

    function goToRegister() {
        history.push('/register')
    }

    return (
        <React.Fragment>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/home">
                    <img
                        src="./images/logo.png"
                        width="70"
                        height="70"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="products">Products</Nav.Link>
                        <Nav.Link href="allproducts">All Products</Nav.Link>

                    </Nav>
                    <Form inline method="POST">
                        <InputGroup className="mr-3">
                            <FormControl
                                placeholder="Email"
                                aria-label="Email"
                                aria-describedby="basic-addon1"
                                type="email"
                                autoComplete="off"
                                onChange={updateFormField}
                                name="email"
                                value={form.email}
                            />
                        </InputGroup>
                        <InputGroup className="mr-3">
                            <FormControl
                                placeholder="Password"
                                aria-label="Password"
                                autoComplete="current-password"
                                aria-describedby="basic-addon1"
                                type="password"
                                onChange={updateFormField}
                                name="password"
                                value={form.password}
                            />
                        </InputGroup>
                        <Button variant="info" onClick={submitLogin}>Login</Button>
                    </Form>
                    <Button className="ml-4" variant="dark" onClick={goToRegister}>Register</Button>
                </Navbar.Collapse>
            </Navbar>
            <Carousel>
                <Carousel.Item interval={2500}>
                    <img
                        className="d-block w-100 h-50"
                        src="./images/carousel-belt.png"
                        alt="carousel-belt"
                    />
                </Carousel.Item>
                <Carousel.Item interval={2500}>
                    <img
                        className="d-block w-100 h-50"
                        src="./images/carousel-rivet.png"
                        alt="carousel-rivet"
                    />
                </Carousel.Item>
                <Carousel.Item interval={2500}>
                    <img
                        className="d-block w-100 h-50"
                        src="./images/carousel-pattern.png"
                        alt="carousel-pattern"
                    />
                </Carousel.Item>
                <Carousel.Item interval={2500}>
                    <img
                        className="d-block w-100 h-50"
                        src="./images/carousel-punch.png"
                        alt="carousel-punch"
                    />
                </Carousel.Item>
            </Carousel>


        </React.Fragment>
    )
}
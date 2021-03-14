import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Nav from '../components/Nav'
import Categories from './Categories'

import {
    Switch,
    Route,
    useHistory,
} from "react-router-dom";

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';

export default function Products() {

    const [apiProducts, setApiProducts] = useState([]);
    const [apiAllProducts, setAllApiProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [product, setProduct] = useState({});
    // const [quantity, setQuantity] = useState(0);
    // const [hasError, setError] = useState(false);
    // const [sendToCart, setSendToCart] = useState({
    //     'foodId':'',
    //     'foodName':'',
    //     'quantity':0,
    //     'price':0,
    // });
    // const [cart, setCart] = useState([])

    // let cart = []

    // function handleClose() {
    //     setQuantity(0);
    //     setShow(false);
    // }

    function handleShow(product_id) {
        setShow(true);
        for (let eachProduct of apiProducts) {
            if (product_id === eachProduct.id) {
                setProduct(eachProduct)
            }
        }
    }

    const history = useHistory()

    // useEffect(() => {
    //     addToCart()
    // }, [cart])

    // const addToCart = () => {
    //     setError(false);
    //     if (quantity !== 0) {
    //         let sendToCart = {
    //             productdId: product.id,
    //             productName: product.name,
    //             quantity: quantity,
    //             price: product.price,
    //         }
    //         setCart([
    //             ...cart,
    //             sendToCart
    //         ])
    //         handleClose()
    //     }
    //     if (quantity === 0) {
    //         setError(true)
    //     }
    //     localStorage.setItem('cartAll', JSON.stringify(cart))
    // console.log("EVERYTHING IN CART NOW: ", cart)
    // }

    //    function addToCart(){
    //         setUpCart()
    //         localStorage.setItem('cartAll', JSON.stringify(cart))
    //         let fetchLocal = JSON.parse(localStorage.getItem('cartAll'))
    //         console.log("Fetch Local: ", fetchLocal)
    //         // console.log("EVERYTHING IN CART NOW: ", cart)
    //     }


    useEffect(() => {
        fetchApi();
    }, [])

    async function fetchApi() {
        let response = await axios.get('https://8080-a3d5bfe8-e545-435f-aa79-ead619c8cac6.ws-us03.gitpod.io/api/products');
        setApiProducts(response.data);
        setAllApiProducts(response.data);

    }

    function renderAllProducts() {
        let jsx = []
        for (let product of apiAllProducts) {
            jsx.push(
                <React.Fragment>
                    {/* <Container> */}
                    <Card border="secondary" style={{ width: "25%" }}>
                        <Card.Body>
                            <Card.Img variant="top" src={product.imgurl} />
                            <Card.Text>
                                <p style={{ fontWeight: "bold" }}>{product.product_name}</p>
                                <p>SKU: {product.sku}</p>
                                <p>{product.description}</p>
                                <p>Price: ${(product.price / 100).toFixed(2)}</p>
                            </Card.Text>
                            <div style={{ textAlign: "center" }}>
                                <Button variant="outline-success" onClick={() => handleShow(product.id)}>Add To Cart</Button>
                            </div>
                        </Card.Body>
                    </Card>
                    {/* </Container> */}
                </React.Fragment>
            )
        }
        return jsx;
    }

    function renderProduct(categoryName) {
        let jsx = []
        for (let product of apiProducts) {
            if (product.category === categoryName) {
                jsx.push(
                    <React.Fragment>
                        {/* <Container> */}
                        <Card border="secondary" style={{ width: "25%" }}>
                            <Card.Body>
                                <Card.Img variant="top" src={product.imgurl} />
                                <Card.Text>
                                    <p style={{ fontWeight: "bold" }}>{product.product_name}</p>
                                    <p>SKU: {product.sku}</p>
                                    <p>{product.description}</p>
                                    <p>Price: ${(product.price / 100).toFixed(2)}</p>
                                </Card.Text>
                                <div style={{ textAlign: "center" }}>
                                    <Button variant="outline-success" onClick={() => handleShow(product.id)}>Add To Cart</Button>
                                </div>
                            </Card.Body>
                        </Card>
                        {/* </Container> */}
                    </React.Fragment>
                )
            }
        }
        return jsx;
    }

    return (
        <React.Fragment>
            <Nav />
            <Categories />
            <Container>
                <h1>All Products</h1>
                {/* <div className="d-flex flex-wrap">
                    {renderProduct()}
                </div> */}


            </Container>

            <Switch>
                <Route exact path="/products">
                    <React.Fragment>
                        <Container>
                            <div className="d-flex flex-wrap">
                                {renderAllProducts()}
                            </div>
                        </Container>
                    </React.Fragment>
                </Route>
                <Route exact path="/products/tools">
                    <React.Fragment>
                        <Container>
                            <div className="d-flex flex-wrap">
                                {renderProduct("tools")}
                            </div>
                        </Container>
                    </React.Fragment>
                </Route>
                <Route exact path="/products/accessories">
                    <React.Fragment>
                        <Container>
                            <div className="d-flex flex-wrap">
                                {renderProduct("accessories")}
                            </div>
                        </Container>
                    </React.Fragment>
                </Route>
                <Route exact path="/products/supplies">
                    <React.Fragment>
                        <Container>
                            <div className="d-flex flex-wrap">
                                {renderProduct("supplies")}
                            </div>
                        </Container>
                    </React.Fragment>
                </Route>
                <Route exact path="/products/stitching">
                    <React.Fragment>
                        <Container>
                            <div className="d-flex flex-wrap">
                                {renderProduct("stitching")}
                            </div>
                        </Container>
                    </React.Fragment>
                </Route>
            </Switch>


        </React.Fragment>
    )
}
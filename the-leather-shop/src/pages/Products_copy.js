// import React from 'react'
// import Nav from '../components/Nav'

// export default function Products(){
//     return (
//         <React.Fragment>
//             <Nav/>
//             <h1>Products</h1>
//         </React.Fragment>
//     )

// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import {
//     Switch,
//     Route,
//     // useHistory,
// } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function CategoriesMenu() {

    const [apiProducts, setApiProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(0);
    const [hasError, setError] = useState(false);
    // const [sendToCart, setSendToCart] = useState({
    //     'foodId':'',
    //     'foodName':'',
    //     'quantity':0,
    //     'price':0,
    // });
    const [cart, setCart] = useState([])

    // let cart = []

    function handleClose() {
        setQuantity(0);
        setShow(false);
    }

    function handleShow(product_id) {
        setShow(true);
        for (let eachProduct of apiProducts) {
            if (product_id === eachProduct.id) {
                setProduct(eachProduct)
            }
        }
    }

    useEffect(()=>{
        addToCart()
    },[cart])

   const addToCart = () => {
        setError(false);
        if(quantity !== 0){
            let sendToCart = {
              productdId: product.id,
              productName: product.name,
              quantity: quantity,
              price: product.price,
            }
            setCart([
                ...cart,
                sendToCart
            ])
            handleClose()
        }
        if(quantity === 0){
            setError(true)
        }
        localStorage.setItem('cartAll', JSON.stringify(cart))
        // console.log("EVERYTHING IN CART NOW: ", cart)
    }

//    function addToCart(){
//         setUpCart()
//         localStorage.setItem('cartAll', JSON.stringify(cart))
//         let fetchLocal = JSON.parse(localStorage.getItem('cartAll'))
//         console.log("Fetch Local: ", fetchLocal)
//         // console.log("EVERYTHING IN CART NOW: ", cart)
//     }

    // const history = useHistory();

    useEffect(() => {
        fetchApi();
    }, [])

    async function fetchApi() {
        let response = await axios.get('https://8080-a3d5bfe8-e545-435f-aa79-ead619c8cac6.ws-us03.gitpod.io/api/products');
        setApiProducts(response.data);
    }

    function renderProduct(categoryName) {
        let jsx = []
        for (let product of apiProducts) {
                jsx.push(
                    <React.Fragment>
                        <Card style={{ width: "25%" }}>
                            <Card.Body>
                                <Card.Img variant="top" src={product.imgurl} />
                                <Card.Text>
                                    <p style={{ fontWeight: "bold" }}>{product.product_name}</p>
                                    <p>{product.description}</p>
                                    <p>Price: ${(product.price / 100).toFixed(2)}</p>
                                </Card.Text>
                                <div style={{ textAlign: "center" }}>
                                    <Button variant="outline-success" onClick={() => handleShow(product.id)}>Add To Cart</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </React.Fragment>
                )
        }
        return jsx;
    }

    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{product.product_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="d-flex justify-content-center">
                        <Form.Group className="d-flex">
                            <Button onClick={()=>{
                                if(quantity !== 0){
                                    setQuantity(quantity-1)
                                }
                            }}> - </Button>
                            <Form.Control value={quantity} style={{ width:'75px', textAlign: 'center' }}></Form.Control>
                            <Button onClick={()=>{
                                setQuantity(quantity+1)
                            }}> + </Button>
                        </Form.Group>
                    </Form>
                    {hasError ? (<div style={{color:'red', textAlign:'center'}}>Please select quantity.</div>) : '' }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=> addToCart()}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* <Switch>
                <Route exact path="/menu">
                    {renderProduct("Breakfast")}
                </Route>
                <Route exact path="/menu/desserts">
                    {renderProduct("Desserts")}
                </Route>
                <Route exact path="/menu/beefburgers">
                    {renderProduct("Beef Burgers")}
                </Route>
                <Route exact path="/menu/chickenburgers">
                    {renderProduct("Chicken Burgers")}
                </Route>
                <Route exact path="/menu/fishburgers">
                    {renderProduct("Fish Burgers")}
                </Route>
                <Route exact path="/menu/coldbeverages">
                    {renderProduct("Cold Beverages")}
                </Route>
                <Route exact path="/menu/warmbeverages">
                    {renderProduct("Warm Beverages")}
                </Route>
                <Route exact path="/menu/sides">
                    {renderProduct("Sides")}
                </Route>
            </Switch> */}
        </React.Fragment>
    )
}
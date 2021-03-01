import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Nav from '../components/Nav'
import Categories from './Categories'

import {
    Switch,
    Route,
    useHistory,
} from "react-router-dom";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function Products() {

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

    const history = useHistory()

    useEffect(() => {
        addToCart()
    }, [cart])

    const addToCart = () => {
        setError(false);
        if (quantity !== 0) {
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
        if (quantity === 0) {
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
            if (product.category === categoryName) {
                jsx.push(
                    <React.Fragment>
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
            <h1>Products</h1>
            <div className="d-flex flex-wrap">
                {renderProduct()}
            </div>

            <Switch>
                <Route exact path="/products/tools">
                    {renderProduct("tools")}
                </Route>
                <Route exact path="/products/accessories">
                    {renderProduct("accessories")}
                </Route>
                <Route exact path="/products/supplies">
                    {renderProduct("supplies")}
                </Route>
                <Route exact path="/products/stitching">
                    {renderProduct("stitching")}
                </Route>
            </Switch>


        </React.Fragment>
    )
}
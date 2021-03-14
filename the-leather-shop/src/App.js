import React from 'react'
import {
    BrowserRouter as Router, Switch, Route
} from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css'

// pages
import Products from './pages/Products'
import Register from './pages/Register'
import Address from './pages/Address'
import Home from './pages/Home'
import OriginalProducts from './pages/OriginalProducts'


function App() {
    return (
        <React.Fragment>

            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route strict path="/products">
                        <Products />
                    </Route>
                    <Route exact path="/allproducts">
                        <OriginalProducts />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                    <Route exact path="/addresses">
                        <Address />
                    </Route>

                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default App;
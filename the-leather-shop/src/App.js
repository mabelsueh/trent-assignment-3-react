import React from 'react'
import {
    BrowserRouter as Router, Switch, Route
} from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css'

// pages
import Home from './pages/Home'
import Products from './pages/Products'
import Register from './pages/Register'
import Address from './pages/Address'


function App() {
  return (
    <React.Fragment>
        <Router>
          <Switch>
              <Route exact path="/">
                <Products/>
              </Route>
              <Route exact path="/register">
                <Register/>
              </Route>
              <Route exact path="/addresses">
                <Address/>
              </Route>
              
          </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
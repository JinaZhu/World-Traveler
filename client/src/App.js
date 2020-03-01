import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { Container, Row, Col } from 'reactstrap';


import './App.css';

import Home from "./Home"
import CountriesList from "./CountriesList"

//friendly reminders:
//any javascript goes inside {}
// you can declare and pass in a function 

function App() {
  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/countries-list">
            <CountriesList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Container>
  )
}

export default App;

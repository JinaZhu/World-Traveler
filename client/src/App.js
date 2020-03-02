import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { Container, Row, Col } from 'reactstrap';


import './App.css';

import Home from "./Home"
import SavedCountriesList from './SavedCountriesList'

//friendly reminders:
//any javascript goes inside {}
// you can declare and pass in a function 

function App() {
  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/saved-countries-list">
            <SavedCountriesList />
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

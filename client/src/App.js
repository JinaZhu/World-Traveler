import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';


import './App.css';

import Home from "./Home"
import SavedCountriesList from './SavedCountriesList'

//friendly reminders:
//any javascript goes inside {}
// you can declare and pass in a function 

function App() {
  return (
    <Container>
      <Nav>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/saved-countries-list">Saved Countries</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Another Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink disabled href="#">Disabled Link</NavLink>
        </NavItem>
      </Nav>
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

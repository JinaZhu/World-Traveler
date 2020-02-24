import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import './App.css';

import Home from "./Home"
import CountriesList from "./CountriesList"

//friendly reminders:
//any javascript goes inside {}
// you can declare and pass in a function 

function App() {
  return (
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
  )
}

export default App;

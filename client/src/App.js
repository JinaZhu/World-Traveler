import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { Container } from 'reactstrap';
import $ from "jquery"


import './App.css';

import Home from "./Home"
import SavedCountriesList from './SavedCountriesList'
import NavBar from './Navbar'

//friendly reminders:
//any javascript goes inside {}
// you can declare and pass in a function 

function App() {
  const [user, setUser] = useState()

  function checkIsLoggedIn() {
    const xhr = $.get('/isLoggedIn')

    xhr.done((data) => {
      console.log('data', data)
      setUser(data)
    })
    xhr.fail((error) => {
      console.log('error', error)
    })
  }

  useEffect(() => {
    checkIsLoggedIn()
  }, [])


  return (
    <Container>
      <NavBar user={user} setUser={setUser} />
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

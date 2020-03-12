import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import $ from "jquery"

import './App.css';

import Home from "./Home"
import SavedCountriesList from './SavedCountriesList'
import NavBar from './Navbar'
import VisitedCountriesList from './VisitedCountriesList'
import { Wrapper } from './styled'


//friendly reminders:
//any javascript goes inside {}
// you can declare and pass in a function 


function App() {
  const [user, setUser] = useState()


  function checkIsLoggedIn() {
    const xhr = $.get('/isLoggedIn')

    xhr.done((data) => {
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
    <Wrapper>
      <NavBar user={user} setUser={setUser} />
      <Router>
        <Switch>
          <Route path="/saved-countries-list">
            <SavedCountriesList />
          </Route>
          <Route path="/visited-countries-list">
            <VisitedCountriesList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  )
}

export default App;

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { Container } from 'reactstrap';
import $ from "jquery"
import styled, { css } from "styled-components";


import './App.css';

import Home from "./Home"
import SavedCountriesList from './SavedCountriesList'
import NavBar from './Navbar'

//friendly reminders:
//any javascript goes inside {}
// you can declare and pass in a function 

const Wrapper = styled.div`
  padding: 5%;
  background: linear-gradient(to top, #E5DACE, #6D7973);
  margin: 0
`;

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
    <Wrapper>
      <div>
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
      </div>
    </Wrapper>
  )
}

export default App;

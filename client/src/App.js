import React from 'react';
import $ from "jquery"
import './App.css';

//friendly reminders:
//any javascript goes inside {}
// you can declare and pass in a function 

function App() {
  function handleClick() {
    const xhr = $.get('http://localhost:5000/api/countriesInfo')
    xhr.done((data) => {
      console.log('data', data)
    })
    xhr.fail((error) => {
      console.log('error', error)
    })
  }
  return (
    <div className="App">
      <button onClick={handleClick}
      >
        Generate an adventure!
      </button>
    </div >
  );
}

export default App;

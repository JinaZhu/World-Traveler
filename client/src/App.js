import React, { useState } from 'react';
import $ from "jquery"
import './App.css';

//friendly reminders:
//any javascript goes inside {}
// you can declare and pass in a function 

function App() {
  // setName is a function, name is a variable that hold the state
  const [country, setCountry] = useState()


  console.log('country', country)
  function handleClick() {
    const xhr = $.get('http://localhost:5000/api/countriesInfo')
    xhr.done((data) => {
      setCountry(data)
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
      <section id="display-country">
        <h3>Country Info</h3>
        {country &&
          <div>
            <dl>
              <dt>Name: {country.country_info.countryName} </dt>

              <dt>Currency: {country.currency}</dt>

              <dt>Lanuage: {country.language}</dt>

              <dt>Visa: {country.country_info.visa}</dt>

              <dt>Vaccination/s: {country.country_info.vaccination}</dt>

              <dt>Monthly Average temperature: {country.country_info.temperatures} for {country.country_info.city_temp}</dt>

              <dt>Advisor Score: {country.advisor_score} to learn more {country.learn_more_advisory}</dt>

              <dt>Popular Cities: <ul>{country.popular_cities.map((city, index) => {
                return <li key={index}>{city}</li>
              })}</ul></dt>
            </dl>
            <div> {country.place_photos.map((reference, index) => {
              return <img key={index} alt="country" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=AIzaSyAGIgU3ILBZtHca1RACPDe30eGGMQAMtHw`} />
            })}</div>
          </div>
        }
      </section>
    </div >
  );
}

export default App;

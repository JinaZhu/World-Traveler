import React, { useState } from 'react';
import $ from "jquery"
import { Button } from 'reactstrap'
import './App.css';
import RegisterModal from './RegisterModal'
import LoginModal from './LoginModal'

//friendly reminders:
//any javascript goes inside {}
// you can declare and pass in a function 

const Home = () => {
    // setName is a function, name is a variable that hold the state
    //country is the data and setCountry is the function that set the data
    const [country, setCountry] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isOpenRegister, setIsOpenRegister] = useState(false)
    const [isOpenLogin, setIsOpenLogin] = useState(false)


    console.log('country', country)

    function handleGenerateClick() {
        setIsLoading(true)
        const xhr = $.get('http://localhost:5000/api/countriesInfo')
        xhr.done((data) => {
            setCountry(data)
            setIsLoading(false)
        })
        xhr.fail((error) => {
            console.log('error', error)
        })
    }


    // function toggle() {
    //     // if/else 
    //     if (!isOpen) {
    //         setIsOpen(true)
    //     } else {
    //         setIsOpen(false)
    //     }

    //     // ternary 
    //     isOpen ? setIsOpen(false): setIsOpen(true)

    //     // shorthand 
    //     setIsOpen(!isOpen)
    // }

    const toggleRegister = () => setIsOpenRegister(!isOpenRegister)
    const toggleLogin = () => setIsOpenLogin(!isOpenLogin)

    return (
        <div className="App">
            <Button color='primary' onClick={toggleRegister}>Register</Button>
            <Button color='primary' onClick={toggleLogin}>Login</Button>
            <Button color='primary' onClick={handleGenerateClick}>Generate an adventure!</Button>
            <RegisterModal isOpen={isOpenRegister} toggle={toggleRegister} />
            <LoginModal isOpen={isOpenLogin} toggle={toggleLogin} />

            <section id="display-country">
                <h3>Country Info</h3>

                {isLoading && <img alt="loading..." src="https://media0.giphy.com/media/8F94rv33nxAFvNEc4H/source.gif" />}
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

export default Home
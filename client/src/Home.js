import React, { useState } from 'react';
import $ from "jquery"
import { Button, Row } from 'reactstrap'
import './App.css';
import CountryInfo from './CountryInfo'
import DisplayMap from './DisplayMap'



//friendly reminders:
//any javascript goes inside {}
// you can declare and pass in a function 

const Home = () => {
    // setName is a function, name is a variable that hold the state
    //country is the data and setCountry is the function that set the data
    const [country, setCountry] = useState()
    const [isLoading, setIsLoading] = useState(false)


    function handleGenerateClick() {
        setIsLoading(true)
        const xhr = $.get('/api/countriesInfo')
        xhr.done((data) => {
            setCountry(data)
            setIsLoading(false)
        })
        xhr.fail((error) => {
            console.log('error', error)
        })
    }



    return (
        <div className="App">
            <Row>
                <Button outline color='primary' onClick={handleGenerateClick}>Generate an adventure!</Button>
                <CountryInfo country={country} isLoading={isLoading} />
            </Row>
            <Row>
                <DisplayMap setCountry={setCountry} />
            </Row>
        </div >
    );
}

export default Home
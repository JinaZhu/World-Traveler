import React, { useState } from 'react';
import $ from "jquery"
import { Button } from 'reactstrap'
import './App.css';
import RegisterModal from './RegisterModal'
import LoginModal from './LoginModal'
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
    const [isOpenRegister, setIsOpenRegister] = useState(false)
    const [isOpenLogin, setIsOpenLogin] = useState(false)

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


    const toggleRegister = () => setIsOpenRegister(!isOpenRegister)
    const toggleLogin = () => setIsOpenLogin(!isOpenLogin)

    return (
        <div className="App">
            <div>
                <Button color='primary' onClick={toggleRegister}>Register</Button>
                <Button color='primary' onClick={toggleLogin}>Login</Button>
                <Button color='primary' onClick={handleGenerateClick}>Generate an adventure!</Button>

                <RegisterModal isOpen={isOpenRegister} toggle={toggleRegister} />
                <LoginModal isOpen={isOpenLogin} toggle={toggleLogin} />
                <CountryInfo country={country} isLoading={isLoading} />
            </div>
            <div>
                <DisplayMap />
            </div>
        </div >

    );
}

export default Home
import React, { useState } from 'react';
import $ from "jquery"
import { Button } from 'reactstrap'
import './App.css';
import RegisterModal from './RegisterModal'
import LoginModal from './LoginModal'
import CountryInfo from './CountryInfo'
import DisplayMap from './DisplayMap'
import SavedCountriesList from './SavedCountriesList'


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
    const [allSavedCountries, setAllSavedCountries] = useState()
    console.log(allSavedCountries)

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

    const handleLogout = (e) => {

        $.post('/logout')
        window.alert("You're logout!")
    }

    const toggleRegister = () => setIsOpenRegister(!isOpenRegister)
    const toggleLogin = () => setIsOpenLogin(!isOpenLogin)
    // const toggleLogout = () => setIsLogout(!isLogout)

    function handleSaveCountry() {
        console.log('hello')
        const xhr = $.get('/savedCountry')
        xhr.done((data) => {
            setAllSavedCountries(data)
        })
        xhr.fail((error) => {
            console.log('error', error)
        })
    }


    return (
        <div className="App">
            <div>
                <Button outline color='primary' onClick={toggleRegister}>Register</Button>
                <RegisterModal isOpen={isOpenRegister} toggle={toggleRegister} />

                <Button outline color='primary' onClick={toggleLogin}>Login</Button>
                <LoginModal isOpen={isOpenLogin} toggle={toggleLogin} />

                <Button outline color='primary' onClick={handleLogout}>Logout</Button>

                <Button outline color='primary' onClick={handleGenerateClick}>Generate an adventure!</Button>
                <CountryInfo country={country} isLoading={isLoading} />

                <Button outline color='primary' onClick={handleSaveCountry}>View Saved</Button>
                <SavedCountriesList saveCountry={allSavedCountries} isLoading={isLoading} />

            </div>
            <div>
                <DisplayMap />
            </div>
        </div >

    );
}

export default Home
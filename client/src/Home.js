import React, { useState } from 'react';
import $ from "jquery"
import { Button } from 'reactstrap'
import './App.css';
import CountryInfo from './CountryInfo'
import DisplayMap from './DisplayMap'
import styled from "styled-components";
import { Tween, Timeline } from 'react-gsap';



//friendly reminders:
//any javascript goes inside {}
// you can declare and pass in a function 

const Wrapper = styled.div`
  padding: 5%;
  background: linear-gradient(to top, #E5DACE, #6D7973);
  margin: 0
`;
const H1 = styled.h1`
    font-family: Verdana;
    color: #3F3931;
    font-size: 50px;
    position: absolute;
    top: 70%; 
    left: 10%;
`

const ButtonAlign = styled.div`
float: center;
z-index: 3;
`

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
        <div>
            <h1>ADVENTURE AWAITS</h1>
            <DisplayMap setCountry={setCountry} />
            <div className="text-center" style={{ padding: '1%' }}>
                <Button outline color='dark' onClick={handleGenerateClick}>Where To Next?</Button>
            </div>
            <CountryInfo country={country} isLoading={isLoading} />


        </div >
    );
}

export default Home
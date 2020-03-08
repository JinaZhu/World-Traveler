import React, { useState, useRef, useEffect } from 'react';
import $ from "jquery"
import { Button } from 'reactstrap'
import './App.css';
import CountryInfo from './CountryInfo'
import DisplayMap from './DisplayMap'
import styled from "styled-components";
import { Slider } from "./styled"
import { TweenMax, Power2, TimelineMax } from 'gsap'


//friendly reminders:
//any javascript goes inside {}
// you can declare and pass in a function 


const Home = () => {
    // setName is a function, name is a variable that hold the state
    //country is the data and setCountry is the function that set the data
    const [country, setCountry] = useState()
    const [isLoading, setIsLoading] = useState(false)
    let slider = useRef(null)

    const tl = new TimelineMax();
    useEffect(() => {
        console.log(slider)
        tl.fromTo(slider, 1.2, { x: "-100%" }, { x: "0%", ease: Power2.easeInOut }, "-=1.2")
    }, [])

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
        <>
            <DisplayMap setCountry={setCountry} />
            <div className="text-center" style={{ padding: '1%' }}>
                <Button outline color='dark' onClick={handleGenerateClick}>Where To Next?</Button>
            </div>
            <CountryInfo country={country} isLoading={isLoading} />
            <Slider ref={el => slider = el} />
        </>
    )
}

export default Home
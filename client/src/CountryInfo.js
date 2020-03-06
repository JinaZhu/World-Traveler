import React from 'react';
import './App.css';
import $ from "jquery"
import { Button, UncontrolledCarousel } from 'reactstrap'



const CountryInfo = ({ country, isLoading }) => {
    if (!isLoading && !country) {
        return null
    }

    if (isLoading) {
        return <img style={{ width: "50%", height: "50%" }} alt="loading..." src="https://media0.giphy.com/media/8F94rv33nxAFvNEc4H/source.gif" />
    }

    const handleCountrySave = (e) => {
        const xhr = $.post('/save', {
            'country': country.country_info.countryName, // country exists at this point, so no need to handle when country is undefined
            'imgUrl': country.place_photos[0],
            'visited': 'no'
        })
        xhr.done((data) => {
            window.alert(data)
        })
        xhr.fail((error) => {
            console.log('error', error)
        })

    }

    const handleVisitedCountry = (e) => {
        const xhr = $.post('/save', {
            'country': country.country_info.countryName, // country exists at this point, so no need to handle when country is undefined
            'imgUrl': country.place_photos[0],
            'visited': 'yes'
        })
        xhr.done((data) => {
            window.alert(data)
        })
        xhr.fail((error) => {
            console.log('error', error)
        })

    }


    const countryPhotoList = country.place_photos.map((reference, index) => {
        return {
            'src': `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${reference}&key=AIzaSyAGIgU3ILBZtHca1RACPDe30eGGMQAMtHw`,
            'altText': index + 1,
            'caption': `Slide ${index + 1}`,
            'header': `Slide ${index + 1} Header`,
            'key': index
        }
    })

    console.log(countryPhotoList)
    return (

        <div>
            <section id="display-country">

                {/* {isLoading && <img style={{ width: "50%", height: "50%" }} alt="loading..." src="https://media0.giphy.com/media/8F94rv33nxAFvNEc4H/source.gif" />} */}
                <div>
                    <h3>Country Information</h3>
                    <Button outline color='primary' onClick={handleCountrySave}>Save</Button>
                    <Button outline color='primary' onClick={handleVisitedCountry}>Visited</Button>

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
                    <div>
                        <UncontrolledCarousel items={countryPhotoList} style={{ width: '300px' }} />
                    </div>
                </div>

            </section>
        </div>
    )
}

export default CountryInfo;
import React from 'react';
import './App.css';
import $ from "jquery"
import { Button } from 'reactstrap'


const CountryInfo = (props) => {
    const { country, isLoading } = props;

    const handleCountrySend = (e) => {
        if (country !== undefined) {
            const xhr = $.post('/save', {
                'country': country.country_info.countryName,
                'imgUrl': country.place_photos[0]
            })
            xhr.done((data) => {
                window.alert("Country Saved!")
            })
            xhr.fail((error) => {
                console.log('error', error)
            })
        }
    }
    return (

        <div>
            <section id="display-country">

                {isLoading && <img style={{ width: "50%", height: "50%" }} alt="loading..." src="https://media0.giphy.com/media/8F94rv33nxAFvNEc4H/source.gif" />}
                {country &&
                    <div>
                        <h3>Country Information</h3>
                        <Button outline color='primary' onClick={handleCountrySend}>Save</Button>

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
        </div>
    )
}

export default CountryInfo;
import React from 'react';
import './App.css';
import $ from "jquery"
import { Button } from 'reactstrap'
import { Info, FilteredPhoto, StyledH3, ButtonAlign, PhotoAlign } from './styled'



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

    return (
        <Info>

            {/* {isLoading && <img style={{ width: "50%", height: "50%" }} alt="loading..." src="https://media0.giphy.com/media/8F94rv33nxAFvNEc4H/source.gif" />} */}
            <img style={{ display: "block", marginLeft: "45%", marginRight: "auto", marginTop: "5%" }} src="https://surgicorps.org/wp-content/uploads/2018/02/watercolor-world-map.png" alt="map" width="100" length="100" />
            <StyledH3>{country.country_info.countryName}</StyledH3>
            <ButtonAlign>
                <Button outline color='dark' onClick={handleCountrySave}>Save</Button>
                <Button outline color='dark' onClick={handleVisitedCountry}>Visited</Button>
            </ButtonAlign>
            {/* 
            <PhotoAlign>
                {country.place_photos.map((reference, index) => {
                    return <FilteredPhoto key={index} alt="country"
                        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=AIzaSyAGIgU3ILBZtHca1RACPDe30eGGMQAMtHw`}
                        width="200" height="200" />
                })}
            </PhotoAlign> */}

            <div>
                <div>Lanuage: {country.language}</div>
                <div>Vaccination/s: {country.country_info.vaccination}</div>
                <div>Visa: {country.country_info.visa}</div>
                <div>Advisor Score: {country.advisor_score} to learn more {country.learn_more_advisory}</div>

                <div>
                    <i class="fas fa-coins"></i>
                    Currency: {country.currency}
                </div>
                <div>Average Price: ${country.country_info.avg_price}</div>
            </div>
            <div>
                <div>Popular Cities: <ul>{country.popular_cities.map((city, index) => {
                    return <li key={index}>{city}</li>
                })}</ul></div>
            </div>
            <div>
                <div>Monthly Average temperature: {country.country_info.temperatures} for {country.country_info.city_temp}</div>
            </div>
        </Info>
    );
}

export default CountryInfo;
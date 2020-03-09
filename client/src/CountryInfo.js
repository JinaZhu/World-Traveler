import React from 'react';
import './App.css';
import $ from "jquery";
import { Button } from 'reactstrap';
import { Info, FilteredPhoto, StyledH3, ButtonAlign, PhotoAlign, IconStyle, InfoStyle, StyledNavLink } from './styled';






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

            <PhotoAlign>
                {country.place_photos.map((reference, index) => {
                    return <FilteredPhoto key={index} alt="country"
                        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=AIzaSyAGIgU3ILBZtHca1RACPDe30eGGMQAMtHw`}
                        width="200" height="200" />
                })}
            </PhotoAlign>

            <InfoStyle>
                <IconStyle>
                    <img src="/static/language.png" alt="logo" height="50" width="50"></img>
                    <p style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>Lanuage</p>
                    <b>{country.language}</b>
                </IconStyle>
                <IconStyle>
                    <img src="/static/vaccination.png" alt="logo" height="50" width="50"></img>
                    <p style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>Vaccination/s</p>
                    <b>{country.country_info.vaccination}</b>
                </IconStyle>
                <IconStyle>
                    <img src="/static/visa.png" alt="logo" height="50" width="50"></img>
                    <p style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>Visa Requirement</p>
                    <b>{country.country_info.visa}</b>
                </IconStyle>
            </InfoStyle>
            <InfoStyle>
                <IconStyle>
                    <img src="/static/safety.png" alt="logo" height="50" width="50"></img>
                    <p style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>Safety Score</p>
                    <b>{country.advisor_score}</b>
                    <p>Low Risk (0 - 5) High Risk</p>
                    <StyledNavLink href={country.learn_more_advisory}>Learn More</StyledNavLink>
                </IconStyle>
                <IconStyle>
                    <img src="/static/currency.png" alt="logo" height="50" width="50"></img>
                    <p style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>Currency</p>
                    <b>{country.currency}</b>
                </IconStyle>
                <IconStyle>
                    <img src="/static/cost.png" alt="logo" height="50" width="50"></img>
                    <p style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>Average Daily Price</p>
                    <b>${country.country_info.avg_price}</b>
                </IconStyle>
            </InfoStyle>
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
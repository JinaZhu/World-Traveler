import React, { useState, useEffect } from 'react'
import $ from "jquery"



const SavedCountriesList = (props) => {
    const [allSavedCountries, setAllSavedCountries] = useState()
    const [isLoading, setIsLoading] = useState(false)

    // function version of componentDidMount
    useEffect(() => {
        console.log('use effect')
        setIsLoading(true)
        const xhr = $.get('/allSavedCountries')
        xhr.done((data) => {
            setIsLoading(false)
            setAllSavedCountries(data)
        })
        xhr.fail((error) => {
            console.log('error', error)
        })
    }, [])

    return (

        <div>
            <section id="display-country">

                {isLoading && <img style={{ width: "50%", height: "50%" }} alt="loading..." src="https://media0.giphy.com/media/8F94rv33nxAFvNEc4H/source.gif" />}
                {allSavedCountries &&
                    <div>
                        <ul>
                            {allSavedCountries.map((country, index) => {
                                return <li key={index}>{country.country_name} <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${country.country_photo}&key=AIzaSyAGIgU3ILBZtHca1RACPDe30eGGMQAMtHw`} /></li>
                            })}
                        </ul>
                    </div>
                }
            </section>
        </div>
    )

}

export default SavedCountriesList; 
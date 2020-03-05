import React, { useState, useEffect } from 'react'
import $ from "jquery"
import { Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap'



const SavedCountriesList = (props) => {
    const [allSavedCountries, setAllSavedCountries] = useState()
    const [isLoading, setIsLoading] = useState(false)

    console.log('allSavedCountries', allSavedCountries)


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

    console.log(allSavedCountries)

    const handleDeleteCountry = (e) => {

        const xhr = $.post('/deleteSaved', {
            'saveId': e
        })

        xhr.done((data) => {
            // console.log(data)
            const newCountryList = allSavedCountries.filter(obj => obj.save_id !== e)
            setAllSavedCountries(newCountryList)
        })
        xhr.fail((error) => {
            console.log('error', error)
        })
    }

    return (

        <div>
            <section id="display-country">

                {isLoading && <img style={{ width: "50%", height: "50%" }} alt="loading..." src="https://media0.giphy.com/media/8F94rv33nxAFvNEc4H/source.gif" />}
                {allSavedCountries &&
                    <div>
                        <ul>
                            {allSavedCountries.map((country) => {
                                return (
                                    <Card>
                                        <CardImg top width="100%" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${country.country_photo}&key=AIzaSyAGIgU3ILBZtHca1RACPDe30eGGMQAMtHw`} alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle>{country.country_name}</CardTitle>
                                            <button onClick={e => handleDeleteCountry(country.save_id)}>Delete</button>
                                        </CardBody>
                                    </Card>
                                )
                            })}
                        </ul>
                    </div>
                }
            </section>
        </div>
    )

}

export default SavedCountriesList; 
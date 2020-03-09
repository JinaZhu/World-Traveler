import React, { useState, useEffect } from 'react'
import $ from "jquery"
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap'

const VisitedCountriesList = (props) => {
    const [allVisitedCountries, setAllVisitedCountries] = useState()
    const [isLoading, setIsLoading] = useState(false)


    // function version of componentDidMount
    useEffect(() => {
        setIsLoading(true)
        const xhr = $.get('/allVisitedCountries')
        xhr.done((data) => {
            setIsLoading(false)
            setAllVisitedCountries(data)
        })
        xhr.fail((error) => {
            console.log('error', error)
        })
    }, [])


    const handleDeleteCountry = (e) => {

        const xhr = $.post('/deleteSaved', {
            'saveId': e
        })

        xhr.done((data) => {
            // console.log(data)
            const newCountryList = allVisitedCountries.filter(obj => obj.save_id !== e)
            setAllVisitedCountries(newCountryList)
        })
        xhr.fail((error) => {
            console.log('error', error)
        })
    }

    return (

        <div>
            <section id="display-country">

                {isLoading && <img style={{ width: "50%", height: "50%" }} alt="loading..." src="https://media0.giphy.com/media/8F94rv33nxAFvNEc4H/source.gif" />}
                {allVisitedCountries &&
                    <div>
                        <ul>
                            {allVisitedCountries.map((country) => {
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

export default VisitedCountriesList; 
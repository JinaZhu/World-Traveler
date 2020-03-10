import React, { useState, useEffect } from 'react'
import $ from "jquery"
import { SaveRow, Polaroid, FilteredPhoto, PolaroidTitle, DeleteButton, PolaroidLayout } from './styled'

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

        <PolaroidLayout>
            {isLoading && <img style={{ width: "50%", height: "50%" }} alt="loading..." src="https://media0.giphy.com/media/8F94rv33nxAFvNEc4H/source.gif" />}
            {allVisitedCountries &&

                <SaveRow>
                    {allVisitedCountries.map((country) => {
                        return <Polaroid>
                            <FilteredPhoto src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${country.country_photo}&key=AIzaSyAGIgU3ILBZtHca1RACPDe30eGGMQAMtHw`} alt="Card image cap" width="297.6" height="297.6" />
                            <PolaroidTitle>{country.country_name}</PolaroidTitle>
                            <div style={{ margin: "0%" }}>
                                <DeleteButton outline color='dark' onClick={e => handleDeleteCountry(country.save_id)}>X</DeleteButton>
                            </div>
                        </Polaroid>
                    })}
                </SaveRow>
            }
            <img style={{ opacity: 0.10 }} src="/static/palmTree.png" alt="logo" height="200" width="1500" />
        </PolaroidLayout>
    )

}

export default VisitedCountriesList; 
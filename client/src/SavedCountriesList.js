import React, { useState, useEffect, useRef } from 'react'
import $ from "jquery"
import { SaveRow, Polaroid, FilteredPhoto, PolaroidTitle, DeleteButton, PolaroidLayout } from './styled'
import { Power2, TimelineMax } from 'gsap'


const SavedCountriesList = (props) => {
    const [allSavedCountries, setAllSavedCountries] = useState()
    const [isLoading, setIsLoading] = useState(false)
    let PolaroidSlide = useRef(null)

    console.log('allSavedCountries', allSavedCountries)


    const tl = new TimelineMax();
    useEffect(() => {
        tl.fromTo(PolaroidSlide, 1.2, { x: "-100%" }, { x: "0%", ease: Power2.easeInOut }, "-=1.2")
    }, [])

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
        <PolaroidLayout ref={el => PolaroidSlide = el}>
            {isLoading && <img style={{ width: "50%", height: "50%" }} alt="loading..." src="https://media0.giphy.com/media/8F94rv33nxAFvNEc4H/source.gif" />}
            {allSavedCountries &&

                <SaveRow >
                    {allSavedCountries.map((country) => {
                        return <Polaroid>
                            <FilteredPhoto src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${country.country_photo}&key=AIzaSyAGIgU3ILBZtHca1RACPDe30eGGMQAMtHw`} alt="Card image cap" width="297.6" height="297.6" />
                            <PolaroidTitle>{country.country_name}</PolaroidTitle>
                            <DeleteButton outline color='dark' onClick={e => handleDeleteCountry(country.save_id)}>X</DeleteButton>
                        </Polaroid>
                    })}
                </SaveRow>
            }
            <img style={{ opacity: 0.17 }} src="/static/mountain.png" alt="logo" height="200" width="1500" />
        </PolaroidLayout>
    )
}

export default SavedCountriesList; 
import React from 'react'

const SavedCountriesList = (props) => {
    const { saveCountry, isloading } = props;

    return (

        <div>
            <section id="display-country">

                {isloading && <img style={{ width: "50%", height: "50%" }} alt="loading..." src="https://media0.giphy.com/media/8F94rv33nxAFvNEc4H/source.gif" />}
                {saveCountry &&
                    <div>
                        <ul>
                            {saveCountry.map((country, index) => {
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
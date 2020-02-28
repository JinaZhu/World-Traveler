import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const apiKey = 'AIzaSyAGIgU3ILBZtHca1RACPDe30eGGMQAMtHw'
const mapStyles = {
    height: '80%',
    width: '100%'
};


// const onMarkerClick = (props, marker, e) => {
//     state = {
//         showingInfoWindow: false,
//         activeMarker: {},
//         selectedPlace: {},
//     };
//     this.setState({
//         selectedPlace: props,
//         activeMarker: marker,
//         showingInfoWindow: true
//     });
// }



class DisplayMap extends Component {
    // constructor() {
    //     super()
    //     this.state = {
    //         lat: '',
    //         long: ''
    //     }

    //     this.handleMapClick = this.handleMapClick.bind(this)
    // }



    handleMapClick(mapProps, map, clickEvent) {
        // const { latLng } = clickEvent
        // const lat = latLng.lat()
        // const lng = latLng.lng()

        // const  country = geoCode({lat, lng})

        // const  xhr = $.post(/countriesinfo, {country})

        // xhr.hr.done

        // console.log('this', this)

        // this.setState({
        //     lat, lng
        // })
        console.log('clickEvent', clickEvent.latLng.lat())
        console.log('clickEvent', clickEvent.latLng.lng())
    }

    render() {
        console.log('this.state', this.state)
        return (
            <Map
                google={this.props.google} onClick={this.handleMapClick} zoom={3}
            >
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey
})(DisplayMap)
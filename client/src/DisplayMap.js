import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import NodeGeocoder from "node-geocoder";

const apiKey = 'AIzaSyAGIgU3ILBZtHca1RACPDe30eGGMQAMtHw'
const options = {
    provider: "google",
    apiKey: apiKey
};

const geocoder = NodeGeocoder(options);
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
    constructor() {
        super()
        this.state = {
            lat: '',
            long: ''
        }

        this.handleMapClick = this.handleMapClick.bind(this)
    }

    handleMapClick(mapProps, map, clickEvent) {

        const { latLng } = clickEvent;

        const lat = latLng.lat();
        const lon = latLng.lng();
        this.setState({ lat, lng: lon });

        geocoder.reverse({ lat, lon }, function (err, res) {
            console.log("res", res[0].country);
        });

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
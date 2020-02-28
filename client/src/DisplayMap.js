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
    render() {
        return (
            <Map
                google={this.props.google} onClick={() => { console.log('hi') }}
            >
                <Marker />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey
})(DisplayMap)
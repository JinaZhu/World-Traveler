import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    height: '80%',
    width: '100%'
};

export class DisplayMap extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={3}
                style={mapStyles}
                initialCenter={{
                    lat: 37.0902,
                    lng: -95.7129
                }}
            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAGIgU3ILBZtHca1RACPDe30eGGMQAMtHw')
})(DisplayMap)
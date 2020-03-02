import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import NodeGeocoder from "node-geocoder";
import $ from "jquery"

const apiKey = 'AIzaSyAGIgU3ILBZtHca1RACPDe30eGGMQAMtHw'
const options = {
    provider: "google",
    apiKey: apiKey
};

const geocoder = NodeGeocoder(options);
const mapStyle = {
    height: '80%',
    width: '80%'
};


class DisplayMap extends Component {
    constructor() {
        super()
        this.state = {
            lat: '',
            long: ''
        }

        this.handleMapClick = this.handleMapClick.bind(this)
    }
    componentDidMount() {
        console.log('I mounted!', this.props.google)
        // this.props.google.event.addListener(polygon, "mouseover", function (e, d) {
        // this.setOptions({ fillcolor: "#FF0000" })
        // console.log(e, d)
        // this.setMap(null);
        // polyShapeOver.setMap(map);
        // });

    }
    handleMapClick(mapProps, map, clickEvent) {
        const { setCountry } = this.props

        const { latLng } = clickEvent;

        const lat = latLng.lat();
        const lon = latLng.lng();
        this.setState({ lat, lng: lon });

        geocoder.reverse({ lat, lon }, function (err, res) {
            if (err) {
                return window.alert('Please click a country')
            }

            const clickedCountry = res[0].country
            const xhr = $.get('/api/countriesInfo', {
                'selectedCountry': clickedCountry
            })

            xhr.done((data) => {
                window.alert("Yay! Country selected")
                setCountry(data)
            })
            xhr.fail((error) => {
                console.log('error', error)
                window.alert("Our researchers are hard at work exploring this unknown territory. Please choose another country!")
            })
        });

    }

    render() {
        return (
            <Map
                google={this.props.google}
                onClick={this.handleMapClick}
                zoom={3}
                style={mapStyle}
            >
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey
})(DisplayMap)
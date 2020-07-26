import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import NodeGeocoder from "node-geocoder";
import $ from "jquery";
import MapStyles from "./MapStyles";

const apiKey = "AIzaSyAGIgU3ILBZtHca1RACPDe30eGGMQAMtHw";
const options = {
  provider: "google",
  apiKey: apiKey,
};
const geocoder = NodeGeocoder(options);

const style = {
  height: "80vh",
  width: "100%",
  padding: "0%",
  margin: "0",
  marginTop: "0",
  position: "relative",
  top: "0",
  outline: "1px solid #3F3931",
  outlineOffset: "7px",
};

const containerStyle = {
  position: "inherit",
  width: "100%",
  height: "100%",
  padding: "0%",
  margin: "0",
};

class DisplayMap extends Component {
  constructor() {
    super();
    this.state = {
      lat: "",
      long: "",
    };

    this.handleMapClick = this.handleMapClick.bind(this);
  }

  _mapLoaded(mapProps, map) {
    map.setOptions({
      styles: MapStyles,
    });
  }
  componentDidMount() {
    console.log("I mounted!", this.props.google);
  }
  handleMapClick(mapProps, map, clickEvent) {
    const { setCountry } = this.props;

    const { latLng } = clickEvent;

    const lat = latLng.lat();
    const lon = latLng.lng();
    this.setState({ lat, lng: lon });

    geocoder.reverse({ lat, lon }, function (err, res) {
      console.log(res);
      if (err) {
        return window.alert("Please click a country");
      }

      const clickedCountry = res[0].country;
      const xhr = $.get("/api/countriesInfo", {
        selectedCountry: clickedCountry,
      });

      xhr.done((data) => {
        window.alert("Yay! Country selected");
        setCountry(data);
      });
      xhr.fail((error) => {
        console.log("error", error);
        window.alert(
          "Our researchers are hard at work exploring this unknown territory. Please choose another country!"
        );
      });
    });
  }

  render() {
    return (
      <Map
        style={style}
        containerStyle={containerStyle}
        google={this.props.google}
        onClick={this.handleMapClick}
        zoom={3}
        onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
      ></Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey,
})(DisplayMap);

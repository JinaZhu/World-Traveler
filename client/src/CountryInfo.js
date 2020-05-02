import React from "react";
import "./App.css";
import $ from "jquery";
import { Button } from "reactstrap";
import {
  Info,
  FilteredPhoto,
  ButtonAlign,
  PhotoAlign,
  IconStyle,
  InfoStyle,
  StyledNavLink,
  CityNavLink,
  CityStyle,
  TempContainer,
  CityContainer,
  SeperateButton,
  TicketBox,
  TitleStyle,
  TicketHeader,
  DetailBox,
  TicketDetailBoxRight,
  TicketDetailBoxLeft,
  DetailTitleP,
  DetailDataP,
  DetailRow,
} from "./styled";
import TempChart from "./TempChart";
import SaveButton from "./SaveButton";

const CountryInfo = ({ country, isLoading, user }) => {
  if (!isLoading && !country) {
    return null;
  }

  if (isLoading) {
    return (
      <img
        style={{
          display: "block",
          marginLeft: "45%",
          marginRight: "auto",
          marginTop: "5%",
        }}
        alt="loading..."
        src="/static/paperplane.gif"
        width="150"
        height="150"
      />
    );
  }

  const handleVisitedCountry = (e) => {
    const xhr = $.post("/save", {
      country: country.country_info.countryName, // country exists at this point, so no need to handle when country is undefined
      imgUrl: country.place_photos[0],
      visited: "yes",
    });
    xhr.done((data) => {
      window.alert(data);
    });
    xhr.fail((error) => {
      console.log("error", error);
    });
  };

  return (
    <Info>
      <TicketBox>
        <TicketHeader>
          <img
            style={{ marginRight: "30%" }}
            src="/static/travelLogo.png"
            alt="logo"
            height="65"
            width="65"
          />
          <div style={{ width: "500px" }}>
            <TitleStyle>
              {country.country_info.countryName.toUpperCase()}
            </TitleStyle>
          </div>
          <div style={{ width: "200px" }}>
            <h4 style={{ color: "white", alignItems: "right" }}>
              Boarding Pass
            </h4>
          </div>
        </TicketHeader>
        <DetailBox>
          <TicketDetailBoxLeft
            style={{
              backgroundImage: "url('/static/map.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "auto",
            }}
          >
            <div style={{ width: "700px", padding: "15px" }}>
              <DetailTitleP>Passenger Name</DetailTitleP>
              <DetailDataP>{user}</DetailDataP>
              <p></p>
              <p></p>
              <DetailRow>
                <DetailTitleP>From</DetailTitleP>
                <DetailTitleP>To</DetailTitleP>
              </DetailRow>
              <DetailRow>
                <DetailDataP>Anywhere</DetailDataP>
                <DetailDataP>{country.country_info.countryName}</DetailDataP>
              </DetailRow>
              <p></p>
              <p></p>
              <DetailRow>
                <DetailTitleP>Class</DetailTitleP>
                <DetailTitleP>Flight</DetailTitleP>
                <DetailTitleP>Gate</DetailTitleP>
              </DetailRow>
              <DetailRow>
                <DetailDataP>First Class</DetailDataP>
                <DetailDataP>Adventure Awaits AA77</DetailDataP>
                <DetailDataP>A7</DetailDataP>
              </DetailRow>
            </div>
          </TicketDetailBoxLeft>
          <TicketDetailBoxRight
            style={{
              borderLeft: "4px dotted #6D7973",
              width: "100%",
              padding: "10px",
            }}
          >
            <DetailTitleP>Passenger</DetailTitleP>
            <DetailDataP>{user}</DetailDataP>
            <p></p>
            <DetailRow>
              <DetailTitleP>Departure</DetailTitleP>
            </DetailRow>
            <DetailRow>
              <DetailDataP>Anytime</DetailDataP>
            </DetailRow>
            <img
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src="/static/barcode.gif"
              alt="barcode"
              height="65"
              width="130"
            />
          </TicketDetailBoxRight>
        </DetailBox>
        <TicketHeader>
          <p style={{ margin: "25px" }}></p>
        </TicketHeader>
      </TicketBox>

      <ButtonAlign>
        <SeperateButton>
          <Button outline color="dark" onClick={handleVisitedCountry}>
            Visited
          </Button>
        </SeperateButton>
      </ButtonAlign>

      <PhotoAlign>
        {country.place_photos.map((reference, index) => {
          return (
            <FilteredPhoto
              key={index}
              alt="country"
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=AIzaSyAGIgU3ILBZtHca1RACPDe30eGGMQAMtHw`}
              width="200"
              height="200"
            />
          );
        })}
      </PhotoAlign>
      <p style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
        Travel Basics
      </p>
      <InfoStyle>
        <IconStyle>
          <img
            src="/static/language.png"
            alt="logo"
            height="50"
            width="50"
          ></img>
          <p style={{ textDecorationLine: "underline", fontWeight: "bold" }}>
            Lanuage
          </p>
          <b>{country.language}</b>
        </IconStyle>
        <IconStyle>
          <img
            src="/static/currency.png"
            alt="logo"
            height="50"
            width="50"
          ></img>
          <p style={{ textDecorationLine: "underline", fontWeight: "bold" }}>
            Currency
          </p>
          <b>{country.currency}</b>
        </IconStyle>
        <IconStyle>
          <img src="/static/cost.png" alt="logo" height="50" width="50"></img>
          <p style={{ textDecorationLine: "underline", fontWeight: "bold" }}>
            Average Daily Price
          </p>
          <b>${country.country_info.avg_price}</b>
        </IconStyle>
      </InfoStyle>
      <InfoStyle>
        <IconStyle style={{ width: "150px" }}>
          <img
            src="/static/vaccination.png"
            alt="logo"
            height="50"
            width="50"
          ></img>
          <p style={{ textDecorationLine: "underline", fontWeight: "bold" }}>
            Vaccination/s
          </p>
          <b>{country.country_info.vaccination}</b>
        </IconStyle>
        <IconStyle>
          <img src="/static/visa.png" alt="logo" height="50" width="50"></img>
          <p style={{ textDecorationLine: "underline", fontWeight: "bold" }}>
            Visa Requirement
          </p>
          <b>{country.country_info.visa}</b>
          <p> </p>
          <p> </p>
          <p> </p>
          <p> </p>
          <p> </p>
        </IconStyle>
        <IconStyle>
          <img src="/static/safety.png" alt="logo" height="50" width="50"></img>
          <p style={{ textDecorationLine: "underline", fontWeight: "bold" }}>
            Safety Score
          </p>
          <b>{country.advisor_score}</b>
          <p>Low Risk (0 - 5) High Risk</p>
          <StyledNavLink href={country.learn_more_advisory} target="_blank">
            Learn More
          </StyledNavLink>
        </IconStyle>
      </InfoStyle>
      <CityStyle>
        <p
          style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}
        >
          Popular Cities
        </p>
        <CityContainer>
          {country.popular_cities.map((city, index) => {
            let cityInfo = `https://en.wikipedia.org/wiki/${city}`;
            return (
              <CityNavLink key={index} href={cityInfo} target="_blank">
                {index + 1}. {city}
              </CityNavLink>
            );
          })}
        </CityContainer>
      </CityStyle>
      <TempContainer>
        <TempChart
          temperatures={country.country_info.temperatures}
          countryName={country.country_info.city_temp}
        />
      </TempContainer>
      <SaveButton
        countryName={country.country_info.countryName}
        imageUrl={country.place_photos[0]}
      />
    </Info>
  );
};

export default CountryInfo;

import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";
import { Button } from "reactstrap";
import "./App.css";
import CountryInfo from "./CountryInfo";
import DisplayMap from "./DisplayMap";
import { Slider } from "./styled";
import { Power2, TimelineMax } from "gsap";

const Home = ({ user }) => {
  // setName is a function, name is a variable that hold the state
  //country is the data and setCountry is the function that set the data
  const [country, setCountry] = useState();
  const [isLoading, setIsLoading] = useState(false);
  let slider = useRef(null);
  let mapSlide = useRef(null);

  const tl = new TimelineMax();
  useEffect(() => {
    tl.fromTo(
      slider,
      1.2,
      { y: "-100%" },
      { y: "0%", ease: Power2.easeInOut },
      "-=1.2"
    ).fromTo(
      mapSlide,
      1.2,
      { x: "-110%" },
      { x: "0%", ease: Power2.easeInOut },
      "-=1.2"
    );
  }, []);

  function handleGenerateClick() {
    setIsLoading(true);
    const xhr = $.get("/api/countriesInfo");
    xhr.done((data) => {
      setCountry(data);
      setIsLoading(false);
    });
    xhr.fail((error) => {
      console.log("error", error);
    });
  }

  return (
    <>
      <div id="map-slide" ref={(el) => (mapSlide = el)}>
        <div>
          <DisplayMap setCountry={setCountry} />
        </div>
        <div className="text-center" style={{ padding: "1%" }}>
          <Button
            outline
            color="dark"
            style={{ margin: "10px" }}
            onClick={handleGenerateClick}
          >
            Explore
          </Button>
        </div>
      </div>
      <div>
        <CountryInfo country={country} isLoading={isLoading} user={user} />
      </div>

      <Slider ref={(el) => (slider = el)} />
    </>
  );
};

export default Home;

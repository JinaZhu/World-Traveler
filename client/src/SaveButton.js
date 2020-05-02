import React, { useState } from "react";
import "./App.css";
import $ from "jquery";
import { Button } from "reactstrap";
import { SaveContainer, SaveBox } from "./styled";

const SaveButton = ({ countryName, imageUrl }) => {
  const [whereTo, setWhereTo] = useState("");
  const [price, setPrice] = useState("");
  const [notify, setNotify] = useState("");

  const handleCountrySaveWithNotify = (e) => {
    const xhr = $.post("/save", {
      country: countryName, // country exists at this point, so no need to handle when country is undefined
      imgUrl: imageUrl,
      visited: "no",
      whereTo,
      price,
      notify: "yes",
    });

    xhr.done((data) => {
      window.alert(data);
    });
    xhr.fail((error) => {
      console.log("error", error);
    });
  };

  const handleCountrySaveWithoutNotify = (e) => {
    const xhr = $.post("/save", {
      country: countryName, // country exists at this point, so no need to handle when country is undefined
      imgUrl: imageUrl,
      visited: "no",
      whereTo,
      price,
      notify: "no",
    });

    xhr.done((data) => {
      window.alert(data);
    });
    xhr.fail((error) => {
      console.log("error", error);
    });
  };

  return (
    <SaveContainer>
      <SaveBox>
        <form onSubmit={handleCountrySaveWithNotify}>
          If price for
          <input type="text" onChange={(e) => setWhereTo(e.target.value)} />
          is below
          <input type="text" onChange={(e) => setPrice(e.target.value)} />,
          please notify me!
          <br />
          <br />
          <Button outline color="dark" onClick={handleCountrySaveWithNotify}>
            Save
          </Button>
        </form>
      </SaveBox>
      <SaveBox>
        I'll go here oneday no matter what. Please don't notify me!
        <br />
        <br />
        <Button outline color="dark" onClick={handleCountrySaveWithoutNotify}>
          Save
        </Button>
      </SaveBox>
    </SaveContainer>
  );
};

export default SaveButton;

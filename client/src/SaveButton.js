import React, { useState } from "react";
import "./App.css";
import $ from "jquery";
import { Button } from "reactstrap";

const SaveButton = ({ countryName, imageUrl }) => {
  const [whereTo, setWhereTo] = useState("");
  const [price, setPrice] = useState("");

  const handleCountrySave = (e) => {
    const xhr = $.post("/save", {
      country: countryName, // country exists at this point, so no need to handle when country is undefined
      imgUrl: imageUrl,
      visited: "no",
      whereTo,
      price,
    });

    xhr.done((data) => {
      window.alert(data);
    });
    xhr.fail((error) => {
      console.log("error", error);
    });
  };

  const handleCountrySave = (e) => {
    const xhr = $.post("/save", {
      country: countryName, // country exists at this point, so no need to handle when country is undefined
      imgUrl: imageUrl,
      visited: "no",
      whereTo,
      price,
    });

    xhr.done((data) => {
      window.alert(data);
    });
    xhr.fail((error) => {
      console.log("error", error);
    });
  };

  return (
    <div>
      <form onSubmit={handleCountrySave}>
        If price for
        <input type="text" onChange={(e) => setWhereTo(e.target.value)} />
        is below
        <input type="text" onChange={(e) => setPrice(e.target.value)} />, please
        notify me!
        <Button outline color="dark" onClick={handleCountrySave}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default SaveButton;

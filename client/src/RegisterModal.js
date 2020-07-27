import React, { useState } from "react";
import $ from "jquery";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./App.css";
import { DeleteButton } from "./styled";

function RegisterModal({ isOpen, toggle }) {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    const xhr = $.post("/register", {
      firstName,
      lastName,
      email,
      password,
      location,
      phone,
    });

    xhr.done((data) => {
      window.alert("Congratulations,  you've registered!");
      toggle();
    });
    xhr.fail((error) => {
      console.log("error", error);
    });
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            First Name:{" "}
            <input
              type="text"
              name="first_name"
              className="form-control"
              onChange={(e) => setFirstname(e.target.value)}
            ></input>
            Last Name:{" "}
            <input
              type="text"
              name="last_name"
              className="form-control"
              onChange={(e) => setLastname(e.target.value)}
            ></input>
            Email:{" "}
            <input
              type="text"
              name="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            Password:{" "}
            <input
              type="text"
              name="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            Location(city):{" "}
            <input
              type="text"
              name="location"
              className="form-control"
              onChange={(e) => setLocation(e.target.value)}
            ></input>
            Phone Number:{" "}
            <input
              type="text"
              name="phone"
              className="form-control"
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button outline color="dark" onClick={toggle}>
            Cancel
          </Button>
          <DeleteButton outline color="dark" onClick={handleSubmit}>
            Submit
          </DeleteButton>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default RegisterModal;

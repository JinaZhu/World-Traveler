import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './App.css';


//friendly reminders:
//any javascript goes inside {}
// you can declare and pass in a function 

function RegisterModal(props) {
    const { isOpen, toggle } = props
    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Register</ModalHeader>
                <ModalBody>
                    <form action="register" method="POST">
                        First Name: <input type="text" name="first_name" className="form-control"></input>
                        Last Name: <input type="text" name="last_name" className="form-control"></input>
                        Email: <input type="text" name="email" className="form-control"></input>
                        Password: <input type="text" name="password" className="form-control"></input>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Register</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default RegisterModal;
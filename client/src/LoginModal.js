import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './App.css';

function LoginModal(props) {
    const { isOpen, toggle } = props
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Login</ModalHeader>
            <ModalBody>
                <form action="/login" method="POST">
                    Email: <input type="text" name="email" className="form-control"></input>
                    Password: <input type="text" name="password" className="form-control"></input>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>login</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default LoginModal;

// https://reactjs.org/docs/conditional-rendering.html
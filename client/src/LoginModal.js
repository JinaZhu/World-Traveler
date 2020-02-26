import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './App.css';

function LoginModal(props) {
    const { isOpen, toggle } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        const xhr = $.post('/login', {
            email,
            password
        })

        xhr.done((data) => {
            window.alert("You're logged in!")
            toggle()
        })
        xhr.fail((error) => {
            console.log('error', error)
        })
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Login</ModalHeader>
            <ModalBody>
                <form>
                    Email: <input type="text" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)}></input>
                    Password: <input type="text" name="password" className="form-control" onChange={(e) => setPassword(e.target.value)}></input>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleLogin}>login</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default LoginModal;

// https://reactjs.org/docs/conditional-rendering.html
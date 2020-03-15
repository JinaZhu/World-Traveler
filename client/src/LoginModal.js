import React, { useState } from 'react';
import $ from "jquery"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './App.css';
import { DeleteButton } from "./styled";

function LoginModal(props) {
    const { isOpen, toggle, setUser } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        const xhr = $.post('/login', {
            email,
            password
        })

        xhr.done((data) => {
            setUser(data)
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
                    Password: <input type="password" name="password" className="form-control" onChange={(e) => setPassword(e.target.value)}></input>
                </form>
            </ModalBody>
            <ModalFooter>
                <DeleteButton outline color="dark" onClick={handleLogin}>login</DeleteButton>
                <Button outline color="dark" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default LoginModal;

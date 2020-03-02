import React, { useState } from 'react';
import { Nav, NavItem, NavLink, Button } from 'reactstrap';
import RegisterModal from './RegisterModal'
import LoginModal from './LoginModal'
import $ from "jquery"

function NavBar({ user, setUser }) {
    const [isOpenRegister, setIsOpenRegister] = useState(false)
    const [isOpenLogin, setIsOpenLogin] = useState(false)

    const toggleRegister = () => setIsOpenRegister(!isOpenRegister)
    const toggleLogin = () => setIsOpenLogin(!isOpenLogin)

    const handleLogout = (e) => {
        const xhr = $.post('/logout')

        xhr.done(() => {
            setUser(undefined)

            window.alert("You're logged out!")
        })
        xhr.fail((error) => {
            console.log('error', error)
        })
    }


    return (

        <Nav>
            <NavItem>
                <NavLink href="/">Home</NavLink>
            </NavItem>
            {user &&
                <NavItem>
                    <NavLink href="/saved-countries-list">{user}'s Travel Bucket List</NavLink>
                </NavItem>
            }
            {!user &&
                <NavItem >
                    <Button outline color='primary' onClick={toggleRegister}>Register</Button>
                </NavItem>
            }
            {!user &&
                <NavItem>
                    <Button outline color='primary' onClick={toggleLogin}>Login</Button>
                </NavItem>
            }
            {user &&
                <NavItem>
                    <Button outline color='primary' onClick={handleLogout}>Logout</Button>
                </NavItem>
            }
            <LoginModal isOpen={isOpenLogin} toggle={toggleLogin} setUser={setUser} />
            <RegisterModal isOpen={isOpenRegister} toggle={toggleRegister} />
        </Nav>

    )

}

export default NavBar; 
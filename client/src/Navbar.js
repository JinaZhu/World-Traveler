import React, { useState } from 'react';
import { Nav, NavItem, NavLink, Button, Container } from 'reactstrap';
import RegisterModal from './RegisterModal'
import LoginModal from './LoginModal'
import $ from "jquery"
import styled, { css } from "styled-components";


const NavAlign = styled(Nav)`
    margin: 20px;
    display:flex;
    justify-content: center;
    align-items: center;
`;



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
        <div>
            <h1 style={{ textAlign: "center" }}> Adventure Awaits</h1 >
            <NavAlign>
                <NavItem>
                    <NavLink href="/">Home</NavLink>
                </NavItem>
                {user &&
                    <NavItem>
                        <NavLink href="/saved-countries-list" style={{ textDecoration: 'none' }} activeStyle={{ color: 'red', textDecoration: 'none' }}>Places To Go</NavLink>
                    </NavItem>
                }
                {user &&
                    <NavItem>
                        <NavLink href="/visited-countries-list" style={{ textDecoration: 'none' }} activeStyle={{ color: 'red', textDecoration: 'none' }}>Places {user} Been</NavLink>
                    </NavItem>
                }
                {!user &&
                    <NavItem >
                        <Button outline color="dark" onClick={toggleRegister}>Register</Button>&nbsp;&nbsp;&nbsp;
                </NavItem>
                }
                {!user &&
                    <NavItem>
                        <Button outline color="dark" onClick={toggleLogin}>Login</Button>
                    </NavItem>
                }
                {user &&
                    <NavItem>
                        <Button outline color="dark" onClick={handleLogout}>Logout</Button>
                    </NavItem>
                }
                <LoginModal isOpen={isOpenLogin} toggle={toggleLogin} setUser={setUser} />
                <RegisterModal isOpen={isOpenRegister} toggle={toggleRegister} />
            </NavAlign>
        </div>
    )

}

export default NavBar; 
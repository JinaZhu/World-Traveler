import React, { useState } from 'react';
import { Nav, NavItem, NavLink, Button } from 'reactstrap';
import RegisterModal from './RegisterModal'
import LoginModal from './LoginModal'
import $ from "jquery"
import styled, { css } from "styled-components";


const NavAlign = styled.nav`
float: right;
z-index: 3;
margin: 0;
top: 0;
right: 60;
bottom:20;
left: 'auto';
position: 'fixed'
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
        <NavAlign>
            <Nav>
                {/* <NavAlign> */}
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
                        <Button outline color="secondary" onClick={toggleRegister}>Register</Button>&nbsp;&nbsp;&nbsp;
                </NavItem>
                }
                {!user &&
                    <NavItem>
                        <Button outline color="secondary" onClick={toggleLogin}>Login</Button>
                    </NavItem>
                }
                {user &&
                    <NavItem>
                        <Button outline color="secondary" onClick={handleLogout}>Logout</Button>
                    </NavItem>
                }
                <LoginModal isOpen={isOpenLogin} toggle={toggleLogin} setUser={setUser} />
                <RegisterModal isOpen={isOpenRegister} toggle={toggleRegister} />
                {/* </NavAlign> */}
            </Nav>
        </NavAlign>
    )

}

export default NavBar; 
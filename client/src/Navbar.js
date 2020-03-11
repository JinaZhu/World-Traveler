import React, { useState, useRef, useEffect } from 'react';
import { Nav, NavItem, NavLink, Button } from 'reactstrap';
import RegisterModal from './RegisterModal'
import LoginModal from './LoginModal'
import $ from "jquery"
import styled from "styled-components";
import { Power2, TimelineMax } from 'gsap'
import { StyledNavLink, NavAlign } from './styled'



// const NavAlign = styled(Nav)`
//     margin: 20px;
//     display:flex;
//     justify-content: center;
//     align-items: center;
// `;


function NavBar({ user, setUser }) {
    const [isOpenRegister, setIsOpenRegister] = useState(false)
    const [isOpenLogin, setIsOpenLogin] = useState(false)
    let NavSlide = useRef(null)

    const toggleRegister = () => setIsOpenRegister(!isOpenRegister)
    const toggleLogin = () => setIsOpenLogin(!isOpenLogin)

    const tl = new TimelineMax();
    useEffect(() => {
        tl.fromTo(NavSlide, 1.2, { y: "-110%" }, { y: "0%", ease: Power2.easeInOut }, "-=1.2")
    }, [])

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
            <div ref={el => NavSlide = el}>
                <a href="/"><img style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} src="/static/travelLogo.png" alt="logo" height="200" width="220"></img></a>
                <NavAlign >
                    <NavItem >
                        <StyledNavLink href="/">Home</StyledNavLink>
                    </NavItem>
                    {user &&
                        <NavItem>
                            <StyledNavLink href="/saved-countries-list">Places To Go</StyledNavLink>
                        </NavItem>
                    }
                    {user &&
                        <NavItem>
                            <StyledNavLink href="/visited-countries-list" style={{ textDecoration: 'none' }}>Places {user} Been</StyledNavLink>
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
        </div >
    )

}

export default NavBar; 
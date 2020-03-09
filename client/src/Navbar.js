import React, { useState, useRef, useEffect } from 'react';
import { Nav, NavItem, NavLink, Button } from 'reactstrap';
import RegisterModal from './RegisterModal'
import LoginModal from './LoginModal'
import $ from "jquery"
import styled from "styled-components";
import { Power2, TimelineMax } from 'gsap'


const NavAlign = styled(Nav)`
    margin: 20px;
    display:flex;
    justify-content: center;
    align-items: center;
`;

const StyledNavLink = styled(NavLink)`
    color: #3F3931;

    &:hover {
        color: #6D7973;
    }
`

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
                <img style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} src="https://mail.google.com/mail/u/0?ui=2&ik=23c0149e5f&attid=0.1&permmsgid=msg-a:r585519150284982156&th=170bceb4cdde4e2b&view=fimg&sz=s0-l75-ft&attbid=ANGjdJ-0UqO8x_50UOo9BfcGKpdXHhXDqblen9T7zKBbMjUWjxFZ3GNP5F4g-LFO_GX78HWxaygGx_s_ZP2XsOjiBjW-jsVDpuXRFxScrImz0HZWEFwj-yQ-9xM7gic&disp=emb&realattid=ii_k7jsia5b0" align="middle" alt="logo" height="200" width="220"></img>
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
import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

function NavBar() {

    return (

        <Nav>
            <NavItem>
                <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/saved-countries-list">Saved Countries</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="#">Another Link</NavLink>
            </NavItem>
            <NavItem>
                <NavLink disabled href="#">Disabled Link</NavLink>
            </NavItem>
        </Nav>

    )

}

export default NavBar; 
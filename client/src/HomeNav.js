import React from 'react'
import { Navbar, Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HomeNav = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Fantasy</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <Link to="/team">My Team</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default HomeNav;
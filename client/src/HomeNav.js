import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class HomeNav extends React.Component {
    imports = () => {
        console.log('yeet')
        fetch('http://localhost:9000/import', {
            method: 'get',
        })
    }
    exports = () => {
        console.log('yeet')
        fetch('http://localhost:9000/save', {
            method: 'get',
        })
    }
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Fantasy</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link className="mr-5" to="/team">My Team</Link>
                        <Link className="mr-5" to="/compare">Compare Players</Link>
                        <Button onClick={() => this.imports()} className="mr-5">import</Button>
                        <Button onClick={() => this.exports()} >export</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default HomeNav;
import { Component } from "react";
import { Button, Container, Dropdown, Nav } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar'
import './style.css'

export default class NavbarPL extends Component{
    render(){
        return(
           <>
            <Navbar expand="lg" className="nav-container">
                <Navbar.Brand className="brand" href="/">PetLover</Navbar.Brand>
                <Nav className="btn-group">
                    <Nav.Link href="/cliente"><Button variant="light" className="navBtn">Clientes</Button></Nav.Link>
                    <Nav.Link href="/pet"><Button variant="light" className="navBtn">Pets</Button></Nav.Link>
                    <Nav.Link href="/produto"><Button variant="light" className="navBtn">Produtos</Button></Nav.Link>
                    <Nav.Link href="/servico"><Button variant="light" className="navBtn">Serviços</Button></Nav.Link>
                    <Nav.Link href="/registro"><Button variant="light" className="navBtn">Registros</Button></Nav.Link>
                </Nav>
            </Navbar>
           </>
        )
    }
}
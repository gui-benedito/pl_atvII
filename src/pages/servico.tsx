import { Component } from "react";
import NavbarPL from "../componentes/Navbar";
import { Outlet } from "react-router-dom";

export default class Servico extends Component {
    render(){
        return(
            <>
                <NavbarPL />
                <div id="main-container">
                    <Outlet />
                </div>
            </>
        )
    }
}
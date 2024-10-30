import { Component } from "react";
import NavbarPL from "../componentes/Navbar";
import Header from "../componentes/Header";
import { Outlet } from "react-router-dom";

export default class Pet extends Component{
    render(){
        return (
            <>
                <NavbarPL />               
                <div id="main-container">
                    <Outlet />
                </div>
            </>
        );
    }
}
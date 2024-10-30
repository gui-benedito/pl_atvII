import { Component, Key } from "react";
import NavbarPL from "../componentes/Navbar";
import { Outlet } from "react-router-dom";
import './css/style.css';

export default class Cliente extends Component {
    render() {
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

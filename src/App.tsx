import { Component } from "react";
import NavbarPL from "./componentes/Navbar";
import { Outlet } from "react-router-dom";
import './App.css'
import welcomeImg from './images/welcome.webp'

export default class App extends Component{
    render(){
        return(
            <>
                <NavbarPL />
                <div id="main-container">
                    <div className="paragrafo-inicial">
                        <h3>Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinarias.</h3>
                        <img src={welcomeImg} />
                    </div>
                    <Outlet />
                </div>
            </>
        )
    }
}
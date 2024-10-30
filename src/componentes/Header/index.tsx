import { Component, ReactNode } from "react";
import { Nav, Navbar } from "react-bootstrap";
import './style.css';

type Props = {
    buttons: ReactNode[];
};

export default class Header extends Component<Props> {
    render() {
        return (
            <Navbar className="btn-header">
                <Nav className="button-group">
                    {this.props.buttons.map((button, index) => (
                        <div key={index} className="nav-button">{button}</div>
                    ))}
                </Nav>
            </Navbar>
        );
    }
}

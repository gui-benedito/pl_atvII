import { Component } from "react";
import Cliente from "../../modelo/cliente";
import CPF from "../../modelo/cpf";
import RG from "../../modelo/rg";
import Telefone from "../../modelo/telefone";
import { Navigate } from 'react-router-dom';
import Modal from "../../componentes/Modal";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../css/style.css'

type AdicionarClienteState = {
    redirectToLista: boolean;
    openModalCadastro: boolean;
    openModalMensagem: boolean
};

export default class FormularioCadastroCliente extends Component<{}, AdicionarClienteState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            redirectToLista: false,
            openModalCadastro: false,
            openModalMensagem: false
        };
    }

    handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        this.setState({ openModalCadastro: true });
    };

    confirmCadastro = () => {
        const clientesSalvos = JSON.parse(localStorage.getItem('clientes') || '[]');
    
        const id = clientesSalvos.length > 0 ? (clientesSalvos[clientesSalvos.length - 1].id + 1) : 1;
        const nome = (document.getElementById('inNome') as HTMLInputElement).value;
        const nomeSocial = (document.getElementById('inNomeSocial') as HTMLInputElement).value;
        const cpf = (document.getElementById('inCPF') as HTMLInputElement).value;
        const cpfData = (document.getElementById('inCPFData') as HTMLInputElement).value;
        const rg = (document.getElementById('inRG') as HTMLInputElement).value;
        const rgData = (document.getElementById('inRGData') as HTMLInputElement).value;
        const ddd = (document.getElementById('inDDD') as HTMLInputElement).value;
        const telefone = (document.getElementById('inTelefone') as HTMLInputElement).value;
        const email = (document.getElementById('inEmail') as HTMLInputElement).value;
    
        const newCliente = new Cliente(id, nome, nomeSocial, new CPF(cpf, cpfData), new RG(rg, rgData), new Telefone(ddd, telefone), email);
    
        clientesSalvos.push(newCliente);
        localStorage.setItem('clientes', JSON.stringify(clientesSalvos));
        
        this.setState({ openModalCadastro: false });
        this.setState({ openModalMensagem: true });
    };

    closeModalCadastro = () => {
        this.setState({ openModalCadastro: false });
    };

    closeModalMensagem = () => {
        this.setState({ openModalMensagem: false });
    };

    redirect = () => {
        setTimeout(() => {
            this.setState({ redirectToLista: true });
        }, 1000)
    }

    render() {
        const { redirectToLista, openModalCadastro, openModalMensagem } = this.state;
        
        if (redirectToLista) {
            return <Navigate to="/cliente" />;
        }

        return (
            <>
                <div className="header">
                    <h2>Cadastrar Cliente</h2>
                    <a href="/cliente" key="lista"><button  className="header-btn">Lista</button></a>
                    <a href="/cliente/cadastro" key="cadastrar"><button  className="header-btn">Cadastrar</button></a>
                </div>
                <form id="form-cliente" onSubmit={this.handleSubmit}>
                    <Row>
                        <Col>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1" id="inNome" />
                            </div>
                        </Col>
                        <Col>
                            <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Nome social" aria-label="Nome social" aria-describedby="basic-addon1" id="inNomeSocial"/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="CPF" aria-label="CPF" aria-describedby="basic-addon1" id="inCPF"/>
                            </div>
                        </Col>
                        <Col>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Data de emissão" aria-label="Data de emissão" aria-describedby="basic-addon1" id="inCPFData" />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="RG" aria-label="RG" aria-describedby="basic-addon1" id="inRG"/>
                            </div>
                        </Col>
                        <Col>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Data de emissão" aria-label="Data de emissão" aria-describedby="basic-addon1" id="inRGData"/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="DDD" aria-label="DDD" aria-describedby="basic-addon1" id="inDDD" />
                            </div>
                        </Col>
                        <Col>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Telefone" aria-label="Telefone" aria-describedby="basic-addon1" id="inTelefone" />
                            </div>
                        </Col>
                    </Row>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input type="text" className="form-control" placeholder="E-mail" aria-label="E-mail" aria-describedby="basic-addon1" id="inEmail"/>
                    </div>
                    <div className="input-group mb-3">
                        <button className="btn-cadastrar" type="submit">Cadastrar</button>
                    </div>
                </form>

                <Modal
                    isOpen={openModalCadastro}
                    label="Confirma o cadastro do cliente??"
                    buttons={
                        <div className="confirma-buttons">
                            <button onClick={this.closeModalCadastro} className="btn btn-danger">Cancelar</button>
                            <button onClick={this.confirmCadastro} className="btn btn-primary">Confirmar</button>
                        </div>
                    }
                >
                    <></>
                </Modal>

                <Modal
                    isOpen={openModalMensagem}
                    label="Cliente cadastrado com sucesso"
                    buttons={
                        <div className="confirma-buttons">
                            <button onClick={this.redirect} className="btn btn-secondary">Ok</button>
                        </div>
                    }
                >
                    <></>
                </Modal>
            </>
        );
    }
}

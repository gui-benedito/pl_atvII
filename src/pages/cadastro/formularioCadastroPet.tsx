import { Component } from "react";
import { Col, Form, Row } from "react-bootstrap";
import '../css/style.css';
import Pet from "../../modelo/pet";
import Modal from "../../componentes/Modal";
import { Navigate } from "react-router-dom";

interface Cliente {
    id: number;
    nome: string;
}

type states = {
    nomeState: string;
    racaState: string;
    tipoState: string;
    generoState: string;
    tutorState: number;
    redirectToLista: boolean;
    openModalCadastro: boolean;
    openModalMensagem: boolean;
    racas: string[];
}

export default class FormularioCadastroPet extends Component<{}, states> {
    constructor(props: {}) {
        super(props);
        this.state = {
            nomeState: '',
            racaState: '',
            tipoState: '',
            generoState: '',
            tutorState: 0,
            redirectToLista: false,
            openModalCadastro: false,
            openModalMensagem: false,
            racas: [] 
        };
    }

    handleNome = (nome: string) => this.setState({ nomeState: nome });
    handleGenero = (genero: string) => this.setState({ generoState: genero });
    handleRaca = (raca: string) => this.setState({ racaState: raca });
    handleTutor = (e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ tutorState: +e.target.value });

    handleTipo = (tipo: string) => {
        const racasPorTipo: { [key: string]: string[] } = {
            Cachorro: ["Labrador", "Bulldog", "Poodle", "Pastor Alemão", "Golden Retriever", "SRD"],
            Gato: ["Persa", "Siamês", "Maine Coon", "Bengal", "Sphynx", "SRD"]
        };
        
        this.setState({ 
            tipoState: tipo,
            racas: racasPorTipo[tipo] || [] 
        });
    };

    closeModalCadastro = () => {
        this.setState({ openModalCadastro: false });
    };

    closeModalMensagem = () => {
        this.setState({ openModalMensagem: false });
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.setState({ openModalCadastro: true });
    };

    confirmaCadastro = () => {
        const clientesSalvos = JSON.parse(localStorage.getItem('clientes') || '[]');
        const newPet = new Pet(this.state.nomeState, this.state.racaState, this.state.generoState, this.state.tipoState);
        for (const cliente of clientesSalvos) {
            if (cliente.id === this.state.tutorState) {
                cliente.pets = cliente.pets || [];
                cliente.pets.push(newPet);
            }
        }
        localStorage.setItem('clientes', JSON.stringify(clientesSalvos));
        this.setState({ openModalCadastro: false });
        this.setState({ openModalMensagem: true });
    };

    redirect = () => {
        setTimeout(() => {
            this.setState({ redirectToLista: true });
        }, 1000);
    };

    render() {
        const { redirectToLista, openModalCadastro, openModalMensagem, racas } = this.state;

        if (redirectToLista) {
            return <Navigate to="/pet" />;
        }

        const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')
            .map((c: Cliente) => ({
                id: +c.id,
                nome: c.nome
            }));

        return (
            <>
                <div className="header">
                    <h2>Cadastrar Pet</h2>
                    <a href="/pet" key="lista"><button className="header-btn">Lista</button></a>
                    <a href="/pet/cadastro" key="cadastrar"><button className="header-btn">Cadastrar</button></a>
                </div>
                <form id="form-pet" onSubmit={this.handleSubmit}>
                    <Row>
                        <Col>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" id="inNome" onChange={(e) => { this.handleNome(e.target.value) }} />
                            </div>
                        </Col>
                        <Col>
                            <div className="input-group mb-3">
                                <Form.Select aria-label="Selecione o Tipo" onChange={(e) => { this.handleTipo(e.target.value) }}>
                                    <option value="">Tipo</option>
                                    <option value="Cachorro">Cachorro</option>
                                    <option value="Gato">Gato</option>
                                </Form.Select>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="input-group mb-3">
                                <Form.Select aria-label="Selecione a Raça" onChange={(e) => { this.handleRaca(e.target.value) }} disabled={!racas.length}>
                                    <option value="">Raça</option>
                                    {racas.map((raca, index) => (
                                        <option key={index} value={raca}>{raca}</option>
                                    ))}
                                </Form.Select>
                            </div>
                        </Col>
                        <Col>
                            <div className="input-group mb-3">
                                <Form.Select aria-label="Selecione o Gênero" onChange={(e) => { this.handleGenero(e.target.value) }}>
                                    <option value="">Gênero</option>
                                    <option value="Macho">Macho</option>
                                    <option value="Fêmea">Fêmea</option>
                                </Form.Select>
                            </div>
                        </Col>
                    </Row>
                    <Form.Select aria-label="Selecione o Tutor" className="tutor-select" onChange={this.handleTutor}>
                        <option value={0}>Selecione o tutor</option>
                        {clientes.map((c: Cliente) => (
                            <option value={c.id} key={c.id}>
                                {c.nome}
                            </option>
                        ))}
                    </Form.Select>
                    <div className="input-group mb-3">
                        <button className="btn-cadastrar" type="submit">Cadastrar</button>
                    </div>
                </form>

                <Modal
                    isOpen={openModalCadastro}
                    label="Confirma o cadastro do pet??"
                    buttons={
                        <div className="confirma-buttons">
                            <button onClick={this.closeModalCadastro} className="btn btn-danger">Cancelar</button>
                            <button onClick={this.confirmaCadastro} className="btn btn-primary">Confirmar</button>
                        </div>
                    }
                >
                    <></>
                </Modal>

                <Modal
                    isOpen={openModalMensagem}
                    label="Pet cadastrado com sucesso"
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

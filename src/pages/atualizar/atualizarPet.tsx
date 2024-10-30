import { Component } from "react";
import Pet from "../../modelo/pet";
import { Col, Row } from "react-bootstrap";
import Modal from "../../componentes/Modal";
import { Navigate } from "react-router-dom";

type AtualizarPetState = {
    pet: Pet | null
    redirectToLista: boolean
    nomeState: string;
    racaState: string;
    tipoState: string;
    generoState: string;
    openModalCadastro: boolean,
    openModalMensagem: boolean
};

export default class AtualizarPet extends Component<{}, AtualizarPetState>{
    constructor(props: {}) {
        super(props);
        this.state = {
            pet: null,
            redirectToLista: false,
            nomeState: '',
            racaState: '',
            tipoState: '',
            generoState: '',
            openModalCadastro: false,
            openModalMensagem: false
        };
    }

    handleNome = (nome: string) => this.setState({ nomeState: nome })
    handleGenero = (genero: string) => this.setState({ generoState: genero })
    handleRaca = (raca: string) => this.setState({ racaState: raca })
    handleTipo = (tipo: string) => this.setState({ tipoState: tipo })
    // handleTutor = (e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ tutorState: +e.target.value })

    componentDidMount() {
        const pathSegments = window.location.pathname.split('/');
        const tutor = (+pathSegments[pathSegments.length - 2]);
        const nome = pathSegments[pathSegments.length - 1];
        if (tutor && nome) {
            const clientesSalvos = JSON.parse(localStorage.getItem("clientes") || "[]");
            let foundPet = null;
            for (const cliente of clientesSalvos) {
                if (cliente.id === tutor) {
                    foundPet = cliente.pets.find((pet: any) => pet.nome === nome);
                    if (foundPet) {
                        foundPet = { ...foundPet, tutor: cliente.id }
                        this.setState({ nomeState: foundPet.nome });
                        this.setState({ racaState: foundPet.raca });
                        this.setState({ tipoState: foundPet.tipo });
                        this.setState({ generoState: foundPet.genero });
                        break
                    }
                }
            }
            if (foundPet) {
                this.setState({ pet: foundPet });
            }
        }
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        this.setState({openModalCadastro: true})
    }

    confirmaAtualizacao = () => {
        this.setState({ openModalCadastro: false });
        this.setState({ openModalMensagem: true });
    }

    closeModalCadastro = () => {
        this.setState({ openModalCadastro: false });
    };

    closeModalMensagem = () => {
        this.setState({ openModalMensagem: false });
    };

    redirect = () => {
        setTimeout(() => {
            this.setState({ redirectToLista: true });
        }, 500)
    }

    render(){
        const { pet, redirectToLista, openModalCadastro, openModalMensagem } = this.state

        if (redirectToLista) {
            return <Navigate to="/pet" />;
        }

        if (!pet) return

        return(
            <div className="container-fluid">
                <h2>Cadastrar Pet</h2>
                <form id="form-pet" onSubmit={this.handleSubmit}>
                    <Row>
                        <Col>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1" id="inNome" onChange={(e) => { this.handleNome(e.target.value) }} defaultValue={pet.nome}/>
                            </div>
                        </Col>
                        <Col>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Raça" aria-label="Raça" aria-describedby="basic-addon1" id="inRaca" onChange={(e) => { this.handleRaca(e.target.value) }} defaultValue={pet.raca} />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Gênero" aria-label="Gênero" aria-describedby="basic-addon1" id="inGenero" onChange={(e) => { this.handleGenero(e.target.value) }} defaultValue={pet.genero} />
                            </div>
                        </Col>
                        <Col>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Tipo" aria-label="Tipo" aria-describedby="basic-addon1" id="inTipo" onChange={(e) => { this.handleTipo(e.target.value) }}  defaultValue={pet.tipo}/>
                            </div>
                        </Col>
                    </Row>
                    {/* <Form.Select aria-label="Selecione o tutor" className="tutor-select" onChange={this.handleTutor}>
                        <option value={0}>Selecione o tutor</option>
                        {clientes.map((c: Cliente) => (
                            <option value={c.id} key={c.id}>
                                {c.nome}
                            </option>
                        ))}
                    </Form.Select> */}
                    <div className="input-group mb-3">
                        <button className="btn-cadastrar" type="submit">Atualizar</button>
                    </div>
                </form>

                <Modal
                    isOpen={openModalCadastro}
                    label="Confirma a atualização do produto??"
                    buttons={
                        <div className="confirma-buttons">
                            <button onClick={this.closeModalCadastro} className="btn btn-danger">Cancelar</button>
                            <button onClick={this.confirmaAtualizacao} className="btn btn-primary">Confirmar</button>
                        </div>
                    }
                >
                    <></>
                </Modal>

                <Modal
                    isOpen={openModalMensagem}
                    label="Produto atualizado com sucesso"
                    buttons={
                        <div className="confirma-buttons">
                            <button onClick={this.redirect} className="btn btn-secondary">Ok</button>
                        </div>
                    }
                >
                    <></>
                </Modal>
            </div>
        )
    }
}
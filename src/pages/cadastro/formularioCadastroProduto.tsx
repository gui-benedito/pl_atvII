import { Component } from "react";
import { Col, Row } from "react-bootstrap";
import Produto from "../../modelo/produto";
import { Navigate } from "react-router-dom";
import Modal from "../../componentes/Modal";

type state = {
    nomeState: string
    valorState: number
    quantidadeState: number
    redirectToLista: boolean,
    openModalCadastro: boolean,
    openModalMensagem: boolean
}

export default class FormularioCadastroProduto extends Component<{}, state>{
    constructor(props: {}){
        super(props)
        this.state = {
            nomeState: "",
            valorState: 0,
            quantidadeState: 0,
            redirectToLista: false,
            openModalCadastro: false,
            openModalMensagem: false
        }
    }

    handleNome = (nome: string) => this.setState({ nomeState: nome })
    handleValor = (valor: number) => this.setState({ valorState: valor })
    handleQuantidade = (quantidade: number) => this.setState({ quantidadeState: quantidade })

    closeModalCadastro = () => {
        this.setState({ openModalCadastro: false });
    };

    closeModalMensagem = () => {
        this.setState({ openModalMensagem: false });
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        this.setState({openModalCadastro: true})
    }

    confirmaCadastro = () => {
        const produtos = JSON.parse(localStorage.getItem('produtos') || '[]')
        const id = produtos.length > 0 ? (+produtos[produtos.length - 1].id) + 1 : 1
        const newproduto = new Produto(id, this.state.nomeState, this.state.valorState, this.state.quantidadeState)
        produtos.push(newproduto)
        localStorage.setItem('produtos', JSON.stringify(produtos))
        this.setState({ openModalCadastro: false })
        this.setState({ openModalMensagem: true })
    }

    redirect = () => {
        setTimeout(() => {
            this.setState({ redirectToLista: true });
        }, 1000)
    }

    render(){
        const { redirectToLista, openModalCadastro, openModalMensagem } = this.state;

        if (redirectToLista) {
            return <Navigate to="/produto" />
        }

        return(
            <>
                <div className="header">
                    <h2>Cadastrar Produto</h2>
                    <a href="/produto" key="lista"><button  className="header-btn">Lista</button></a>
                    <a href="/produto/cadastro" key="cadastrar"><button  className="header-btn">Cadastrar</button></a>
                </div>
                <form id="form-produto" onSubmit={this.handleSubmit}>
                    <Row>
                        <Col>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1" id="inNome" onChange={(e) => { this.handleNome(e.target.value) }} />
                            </div>
                        </Col>
                        <Col>
                            <div className="input-group mb-3">
                                <input type="number" className="form-control" placeholder="Valor" aria-label="Valor" aria-describedby="basic-addon1" id="inValor" onChange={(e) => { this.handleValor(+e.target.value) }} />
                            </div>
                        </Col>
                        <Col>
                            <div className="input-group mb-3">
                                <input type="number" className="form-control" placeholder="Quantidade" aria-label="Quantidade" aria-describedby="basic-addon1" id="inQuantidade" onChange={(e) => { this.handleQuantidade(+e.target.value) }} />
                            </div>
                        </Col>
                    </Row>
                    <div className="input-group mb-3">
                        <button className="btn-cadastrar" type="submit">Cadastrar</button>
                    </div>
                </form>

                <Modal
                    isOpen={openModalCadastro}
                    label="Confirma o cadastro do produto??"
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
                    label="Produto cadastrado com sucesso"
                    buttons={
                        <div className="confirma-buttons">
                            <button onClick={this.redirect} className="btn btn-secondary">Ok</button>
                        </div>
                    }
                >
                    <></>
                </Modal>
            </>
        )
    }
}
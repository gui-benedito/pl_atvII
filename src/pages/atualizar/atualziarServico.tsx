import { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Servico from "../../modelo/servico";
import Modal from "../../componentes/Modal";

type State = {
    produto: Servico | null;
    nomeState: string;
    valorState: number;
    redirectToLista: boolean;
    openModalCadastro: boolean;
    openModalMensagem: boolean
};

export default class AtualizarServico extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            produto: null,
            redirectToLista: false,
            nomeState: '',
            valorState: 0,
            openModalCadastro: false,
            openModalMensagem: false
        };
    }

    handleNome = (nome: string) => this.setState({ nomeState: nome });
    handleValor = (valor: number) => this.setState({ valorState: valor });

    componentDidMount() {
        const pathSegments = window.location.pathname.split('/');
        const id = pathSegments[pathSegments.length - 1];
        if (id) {
            const produtosSalvos = JSON.parse(localStorage.getItem("servicos") || "[]");
            const foundProduto = produtosSalvos.find((c: { id: number }) => c.id === +id);
            if (foundProduto) {
                this.setState({
                    produto: foundProduto,
                    nomeState: foundProduto.nome,
                    valorState: foundProduto.valor,
                });
            }
        }
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.setState({openModalCadastro: true})
    };

    confirmaAtualizacao = () => {
        const produtosSalvos = JSON.parse(localStorage.getItem("servicos") || "[]");
        const { produto, nomeState, valorState } = this.state;
        if (!produto) return;
        const updatedProduto = new Servico(
            produto.id,
            nomeState || produto.nome,
            valorState !== 0 ? valorState : produto.valor,
        );
        const updatedProdutos = produtosSalvos.map((c: { id: number }) => 
            (c.id === produto.id ? updatedProduto : c)
        );
        localStorage.setItem("servicos", JSON.stringify(updatedProdutos));
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

    render() {
        const { produto, redirectToLista, nomeState, valorState, openModalCadastro, openModalMensagem } = this.state;

        if (redirectToLista) {
            return <Navigate to="/servico" />;
        }

        if (!produto) return null;

        return (
            <div className="container-fluid">
                <h2>Atualizar Produto</h2>
                <form id="form-produto" onSubmit={this.handleSubmit}>
                    <Row>
                        <Col>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nome"
                                    aria-label="Nome"
                                    id="inNome"
                                    onChange={(e) => this.handleNome(e.target.value)}
                                    value={nomeState}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="input-group mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Valor"
                                    aria-label="Valor"
                                    id="inValor"
                                    onChange={(e) => this.handleValor(+e.target.value)}
                                    value={valorState}
                                />
                            </div>
                        </Col>
                    </Row>
                    <div className="input-group mb-3">
                        <button className="btn-cadastrar" type="submit">Atualizar</button>
                    </div>
                </form>

                <Modal
                    isOpen={openModalCadastro}
                    label="Confirma a atualização do serviço??"
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
                    label="Serviço atualizado com sucesso"
                    buttons={
                        <div className="confirma-buttons">
                            <button onClick={this.redirect} className="btn btn-secondary">Ok</button>
                        </div>
                    }
                >
                    <></>
                </Modal>
            </div>
        );
    }
}

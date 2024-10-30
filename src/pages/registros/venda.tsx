import { Component } from "react";
import Produto from "../../modelo/produto";
import Servico from "../../modelo/servico";
import Cliente from "../../modelo/cliente";
import { Col, Form, Row } from "react-bootstrap";
import '../css/style.css'
import Modal from "../../componentes/Modal";

type state = {
    produtos: Produto[] | null
    servicos: Servico[] | null
    clientes: Cliente[] | null
    clienteSelecionado: Cliente | null
    produtoSelecionado: Produto | null
    servicoSelecionado: Servico | null
    quantidade: number
    openModalCadastro: boolean,
    openModalMensagem: boolean,
    openModalMensagemQuantidade: boolean
}

export default class venda extends Component<{}, state>{
    constructor(props: {}){
        super(props)
        this.state = {
            clientes: this.getClientes(),
            produtos: this.getProdutos(),
            servicos: this.getServicos(),
            clienteSelecionado: null,
            produtoSelecionado: null,
            servicoSelecionado: null,
            quantidade: 0,
            openModalCadastro: false,
            openModalMensagem: false,
            openModalMensagemQuantidade: false
        }
    }

    getClientes = () => JSON.parse(localStorage.getItem('clientes') || '[]')
    getProdutos = () => JSON.parse(localStorage.getItem('produtos') || '[]')
    getServicos = () => JSON.parse(localStorage.getItem('servicos') || '[]')

    handleQuantidade = (quantidade: number) => {
        this.setState({ quantidade })
    }

    handleCliente = (id: number) => {
        const cliente = this.state.clientes?.find((c) => c.id === id) || null
        this.setState({clienteSelecionado: cliente})
    }

    handleProduto = (id: number) => {
        const produto = this.state.produtos?.find((c) => c.id === id) || null
        this.setState({produtoSelecionado: produto})
    }

    handleServico = (id: number) => {
        const servico = this.state.servicos?.find((c) => c.id === id) || null
        this.setState({servicoSelecionado: servico})
    }

    closeModalMensagemQuantidade = () => {
        this.setState({ openModalMensagemQuantidade: false });
    };

    closeModalCadastro = () => {
        this.setState({ openModalCadastro: false });
    };

    closeModalMensagem = () => {
        this.setState({ openModalMensagem: false });
    };

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(this.state.produtoSelecionado && !this.state.quantidade){
            this.setState({openModalMensagemQuantidade: true})
        } else {
            this.setState({openModalCadastro: true})
        }
    }

    confirmaCadastro = () => {
        const { clientes, clienteSelecionado, produtoSelecionado, servicoSelecionado, quantidade } = this.state;
        if (clientes && clienteSelecionado) {
            const updatedClientes = clientes.map(cliente => {
                if (cliente.id === clienteSelecionado.id) {
                    if (produtoSelecionado) {
                        for (let i = 0; i < quantidade; i++) {
                            cliente.produtosConsumidos.push(produtoSelecionado);
                        }
                    }
                    if (servicoSelecionado) {
                        cliente.servicosConsumidos.push(servicoSelecionado);
                    }
                }
                return cliente;
            })
            this.setState({ clientes: updatedClientes });
            localStorage.setItem('clientes', JSON.stringify(updatedClientes));

            (document.getElementById('formVenda') as HTMLFormElement).reset()

            this.setState({ openModalCadastro: false })
            this.setState({ openModalMensagem: true })
        }
    }

    render(){
        const {clientes, produtos, servicos, openModalCadastro, openModalMensagem, openModalMensagemQuantidade} = this.state

        if (!clientes || !produtos || !servicos) return null

        return(
            <div className="form-venda">
                <form onSubmit={this.handleSubmit} id="formVenda">
                    <Row>
                        <Col>
                            <Form.Select aria-label="Selecione o tutor" className="tutor-select" onChange={(e) => this.handleCliente(+e.target.value)}>
                                <option value={0}>Selecione o cliente</option>
                                {clientes.map((c: Cliente) => (
                                    <option value={c.id} key={c.id}>
                                        {c.nome}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select aria-label="Selecione o tutor" className="tutor-select" onChange={(e) => this.handleProduto(+e.target.value)}>
                                <option value={0}>Selecione o produto</option>
                                {produtos.map((p: Produto) => (
                                    <option value={p.id} key={p.id}>
                                        {p.nome}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col>
                            <div className="input-group mb-3">
                                <input type="number" className="form-control" placeholder="Quantidade" aria-label="Quantidade" aria-describedby="basic-addon1" id="inDDD" onChange={(e) => this.handleQuantidade(+e.target.value)} />
                            </div>
                        </Col>
                        <Col>
                            <Form.Select aria-label="Selecione o tutor" className="tutor-select" onChange={(e) => this.handleServico(+e.target.value)}>
                                <option value={0}>Selecione o serviço</option>
                                {servicos.map((s: Servico) => (
                                    <option value={s.id} key={s.id}>
                                        {s.nome}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>
                    <div className="input-group mb-3">
                        <button className="btn-cadastrar-venda" type="submit">Cadastrar Venda</button>
                    </div>
                </form>

                <Modal
                    isOpen={openModalCadastro}
                    label="Confirma o cadastro da venda?"
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
                    label="Venda cadastrada com sucesso"
                    buttons={
                        <div className="confirma-buttons">
                            <button onClick={this.closeModalMensagem} className="btn btn-secondary">Ok</button>
                        </div>
                    }
                >
                    <></>
                </Modal>

                <Modal
                    isOpen={openModalMensagemQuantidade}
                    label="Selecione quantidade de produto"
                    buttons={
                        <div className="confirma-buttons">
                            <button onClick={this.closeModalMensagemQuantidade} className="btn btn-secondary">Ok</button>
                        </div>
                    }
                >
                    <></>
                </Modal>
            </div>
        )
    }
}
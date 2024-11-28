import { Component } from "react";
import ProdutoCard from "./podutoCard";
import imgSemProduto from "../../images/produto-vazio.webp"
import Modal from "../../componentes/Modal";

type Produto = {
    id: number
    nome: string
    valor: number
    quantidade: number
}

export default class ListaProduto extends Component<{}, {produtos: Produto[], produtoIdParaExcluir: number | null, openModalMensagem: boolean, openModalExcluir: boolean}>{
    constructor(props: {}) {
        super(props);
        this.state = {
            produtos: this.getProdutos(),
            openModalExcluir: false,
            produtoIdParaExcluir: null,
            openModalMensagem: false
        };
    }

    closeModalExcluir = () => this.setState({ openModalExcluir: false });

    openModalConfirmaExcluir = (id: number) => this.setState({ openModalExcluir: true, produtoIdParaExcluir: id });

    closeModalMensagem = () => {
        this.setState({ openModalMensagem: false });
    };

    getProdutos = (): Produto[] => {
        const produtos = JSON.parse(localStorage.getItem('produtos') || '[]')
        return produtos
    }

    confirmaExcluir = () => {
        const { produtoIdParaExcluir, produtos } = this.state;
        if (produtoIdParaExcluir !== null) {
            const updatedProdutos = produtos.filter((cliente) => cliente.id !== produtoIdParaExcluir);
            localStorage.setItem("produtos", JSON.stringify(updatedProdutos));
            this.setState({ produtos: updatedProdutos, openModalExcluir: false, produtoIdParaExcluir: null });
            this.setState({ openModalMensagem: true })
        }
    }

    render(){
        const { produtos, openModalExcluir, openModalMensagem } = this.state;

        return(
            <>
                <div className="header">
                    <h2>Lista de Produtos</h2>
                    <a href="/produto" key="lista"><button  className="header-btn">Lista</button></a>
                    <a href="/produto/cadastro" key="cadastrar"><button  className="header-btn">Cadastrar</button></a>
                </div>
                <div className="Card-container">
                    <>
                        <ProdutoCard 
                            key={0}
                            id={0} 
                            nome={'Ração'} 
                            valor={80} 
                            quantidade={200} 
                            onExcluir={() => this.openModalConfirmaExcluir(0)}                          
                        />
                        {produtos.map((produto) => (
                            <ProdutoCard 
                                key={produto.id}
                                id={produto.id} 
                                nome={produto.nome} 
                                valor={produto.valor} 
                                quantidade={produto.quantidade} 
                                onExcluir={() => this.openModalConfirmaExcluir(produto.id)}                          
                            />
                        ))}
                    </>
                    <Modal
                        isOpen={openModalExcluir}
                        label="Confirma a exclusão do produto?"
                        buttons={
                            <div className="confirma-buttons">
                                <button onClick={this.closeModalExcluir} className="btn btn-danger">Cancelar</button>
                                <button onClick={this.confirmaExcluir} className="btn btn-primary">Confirmar</button>
                            </div>
                        }
                    >
                        <></>
                    </Modal>
                    <Modal
                        isOpen={openModalMensagem}
                        label="Produto excluído com sucesso"
                        buttons={
                            <div className="confirma-buttons">
                                <button onClick={this.closeModalMensagem} className="btn btn-secondary">Ok</button>
                            </div>
                        }
                    >
                        <></>
                    </Modal>
                </div>
            </>
        )
    }
}
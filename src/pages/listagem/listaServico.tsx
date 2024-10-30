import { Component } from "react";
import ProdutoCard from "./podutoCard";
import ServicoCard from "./servicoCard";
import imgSemServio from "../../images/servico-vazio.jpg"
import Modal from "../../componentes/Modal";

type Servico = {
    id: number
    nome: string
    valor: number
    quantidade: number
}

export default class ListaServico extends Component<{}, {servicos: Servico[], servicoIdparaExcluir: number | null, openModalExcluir: boolean, openModalMensagem: boolean}>{
    constructor(props: {}) {
        super(props);
        this.state = {
            servicos: this.getServicos(),
            openModalExcluir: false,
            servicoIdparaExcluir: null,
            openModalMensagem: false
        };
    }
    closeModalExcluir = () => this.setState({ openModalExcluir: false });

    openModalConfirmaExcluir = (id: number) => this.setState({ openModalExcluir: true, servicoIdparaExcluir: id });

    closeModalMensagem = () => {
        this.setState({ openModalMensagem: false });
    };

    getServicos = (): Servico[] => {
        const Servicos = JSON.parse(localStorage.getItem('servicos') || '[]')
        return Servicos
    }

    confirmaExcluir = () => {
        const { servicoIdparaExcluir, servicos } = this.state;
        if (servicoIdparaExcluir !== null) {
            const updatedProdutos = servicos.filter((servico) => servico.id !== servicoIdparaExcluir);
            localStorage.setItem("servicos", JSON.stringify(updatedProdutos));
            this.setState({ servicos: updatedProdutos, openModalExcluir: false, servicoIdparaExcluir: null });
            this.setState({ openModalMensagem: true })
        }
    }

    render(){
        const { servicos, openModalExcluir, openModalMensagem } = this.state;

        return(
            <>
                <div className="header">
                    <h2>Lista de Servicos</h2>
                    <a href="/servico" key="lista"><button  className="header-btn">Lista</button></a>
                    <a href="/servico/cadastro" key="cadastrar"><button  className="header-btn">Cadastrar</button></a>
                </div>
                <div className="Card-container">
                    {servicos.length <= 0 ?
                    <>
                        <div className="lista-vazia">
                            <img src={imgSemServio}/>
                        </div>
                    </> 
                    : 
                    <>
                        {servicos.map((servico) => (
                            <ServicoCard 
                                key={servico.id}
                                id={servico.id} 
                                nome={servico.nome} 
                                valor={servico.valor} 
                                onExcluir={() => this.openModalConfirmaExcluir(servico.id)}                          
                            />
                        ))}
                    </>
                    }
                    <Modal
                        isOpen={openModalExcluir}
                        label="Confirma a exclusão do serviço?"
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
                        label="Serviço excluído com sucesso"
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
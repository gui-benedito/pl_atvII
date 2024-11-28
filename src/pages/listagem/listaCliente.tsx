import { Component } from "react";
import ClienteCard from "./clienteCard";
import { Navigate, Outlet } from "react-router-dom";
import Modal from "../../componentes/Modal";
import imgSemCliente from "../../images/lista-vazia.jpg"
import '../css/style.css'

type ClienteType = {
    id: number;
    nome: string;
    nomeSocial: string;
    cpf: {
        valor: string;
        dataEmissao: string;
    };
    rg: {
        valor: string;
        dataEmissao: string;
    };
    telefones: [
        {
            ddd: string;
            numero: string;
        }
    ];
    email: string;
    pets: []
    produtosConsumidos: []
    servicosConsumidos: []
};

export default class ListaCliente extends Component<{}, { clientes: ClienteType[], openModalExcluir: boolean, clienteIdParaExcluir: number | null, openModalMensagem: boolean, redirectToLista: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            clientes: this.getClientes(),
            redirectToLista: false,
            openModalExcluir: false,
            clienteIdParaExcluir: null,
            openModalMensagem: false
        };
    }

    closeModalExcluir = () => this.setState({ openModalExcluir: false });

    openModalConfirmaExcluir = (id: number) => this.setState({ openModalExcluir: true, clienteIdParaExcluir: id });

    getClientes = (): ClienteType[] => {
        const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
        return Array.isArray(clientes) ? clientes : [];
    };

    closeModalMensagem = () => {
        this.setState({ openModalMensagem: false });
    };

    confirmaExcluir = () => {
        const { clienteIdParaExcluir, clientes } = this.state;
        if (clienteIdParaExcluir !== null) {
            const updatedClientes = clientes.filter((cliente) => cliente.id !== clienteIdParaExcluir);
            localStorage.setItem("clientes", JSON.stringify(updatedClientes));
            this.setState({ clientes: updatedClientes, openModalExcluir: false, clienteIdParaExcluir: null });
            this.setState({ openModalMensagem: true })
        }
    };

    render() {
        const { clientes, openModalExcluir, openModalMensagem } = this.state;

        return (
            <>
                <div className="header">
                    <h2>Lista de Clientes</h2>
                    <a href="/cliente" key="lista"><button  className="header-btn">Lista</button></a>
                    <a href="/cliente/cadastro" key="cadastrar"><button  className="header-btn">Cadastrar</button></a>
                </div>
                <div className="Card-container">
                    <ClienteCard
                        key={0}
                        id={0}
                        nome={'Guilherme dos Santos Benedito'}
                        nomeSocial={'Guilherme'}
                        cpf={{
                            valor: '440.605.828-16',
                            dataEmissao: '10/01/2000',
                        }}
                        rg={{
                            valor: '50.152.529-4',
                            dataEmissao: '10/01/2000',
                        }}
                        telefones={
                            [{
                                ddd: '12',
                                numero: '991810093'
                            }]
                        }
                        email={'guisantos.benedito@gmail.com'}
                        onExcluir={() => this.openModalConfirmaExcluir(0)} 
                        pets={[]}
                    />
                    {clientes.map((cliente) => (
                        <ClienteCard
                            key={cliente.id}
                            id={cliente.id}
                            nome={cliente.nome}
                            nomeSocial={cliente.nomeSocial}
                            cpf={{
                                valor: cliente.cpf.valor,
                                dataEmissao: cliente.cpf.dataEmissao,
                            }}
                            rg={{
                                valor: cliente.rg.valor,
                                dataEmissao: cliente.rg.dataEmissao,
                            }}
                            telefones={cliente.telefones}
                            email={cliente.email}
                            onExcluir={() => this.openModalConfirmaExcluir(cliente.id)} 
                            pets={cliente.pets}
                        />
                    ))}
                </div>
                <Modal
                    isOpen={openModalExcluir}
                    label="Confirma a exclusão do cliente?"
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
                    label="Cliente excluído com sucesso"
                    buttons={
                        <div className="confirma-buttons">
                            <button onClick={this.closeModalMensagem} className="btn btn-secondary">Ok</button>
                        </div>
                    }
                >
                    <></>
                </Modal>
                <Outlet />
            </>
        );
    }
}

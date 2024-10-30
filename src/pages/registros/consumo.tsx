import { Component, ReactNode } from "react";
import ClienteCard from "../listagem/clienteCard";
import ConsumoCard from "./consumoCard";
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

export default class Consumo extends Component<{}, {clientes: ClienteType[]}>{
    constructor(props: {}) {
        super(props);
        this.state = {
            clientes: this.getClientes(),
        };
    }

    getClientes = (): ClienteType[] => {
        const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
        return Array.isArray(clientes) ? clientes : [];
    };

    render(): ReactNode {
        const { clientes } = this.state;

        return(
            <div className="consumo-container">
                <div className="Card-container">
                    {clientes.length <= 0 ? 
                        <div>
                            <h3>Sem consumos</h3>
                        </div>
                        :
                        <>
                            {clientes.map((cliente) => (
                                <ConsumoCard
                                    key={cliente.id}
                                    id={cliente.id}
                                    nome={cliente.nome} 
                                    produtosConsumidos={cliente.produtosConsumidos} 
                                    servicosConsumidos={cliente.servicosConsumidos}
                                />
                            ))}
                        </>
                    }
                </div>
            </div>
        )
    }
}
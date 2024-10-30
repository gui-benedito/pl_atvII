import { Component } from "react";
import Cliente from "../../modelo/cliente";
import { Card } from "react-bootstrap";
import '../css/style.css'

type ClienteSorted = {
    clientesFiltered: {
        nome: string;
        qtd: number;
    }[];
    clientes: Cliente[] | null;
    cabecalho: string | null
};

export default class MaisConsumidos extends Component<{}, ClienteSorted> {
    constructor(props: {}) {
        super(props);
        this.state = {
            clientesFiltered: [],
            clientes: this.getClientes(),
            cabecalho: null
        };
    }

    getClientes = (): Cliente[] => JSON.parse(localStorage.getItem('clientes') || '[]');

    dezProdutosMaisConsumidos = () => {
        if (!this.state.clientes?.length){
            this.setState({cabecalho: 'Sem produtos consumidos'})
            return
        }
        this.setState({cabecalho: 'Clientes que mais consumiram por produto'})
        const maisConsumiram = this.state.clientes.map((cliente) => {
            const nome = cliente.nome;
            const qtd = cliente.produtosConsumidos.length; 
            return { nome, qtd };
        });
        const dezMais = maisConsumiram
            .filter((c) => c.qtd > 0)
            .sort((a, b) => b.qtd - a.qtd)
            .slice(0, 10);
        if(!dezMais.length){
            this.setState({cabecalho: 'Sem serviços consumidos'})
        } else{
            this.setState({cabecalho: 'Clientes que mais consumiram por serviço'})
        }
        this.setState({ clientesFiltered: dezMais });
    };

    dezServicosMaisConsumidos = () => {
        if (!this.state.clientes?.length){
            this.setState({cabecalho: 'Sem serviços consumidos'})
            return
        }
        const maisConsumiram = this.state.clientes.map((cliente) => {
            const nome = cliente.nome;
            const qtd = cliente.servicosConsumidos.length;
            return { nome, qtd };
        });
        const dezMais = maisConsumiram
            .filter((c) => c.qtd > 0)
            .sort((a, b) => b.qtd - a.qtd)
            .slice(0, 10);
        if(!dezMais.length){
            this.setState({cabecalho: 'Sem serviços consumidos'})
        } else{
            this.setState({cabecalho: 'Clientes que mais consumiram por serviço'})
        }
        this.setState({ clientesFiltered: dezMais });
    };

    render() {
        const { clientesFiltered, cabecalho } = this.state;

        return (
            <>  
                <div className="btn-filtro">
                    <button onClick={this.dezProdutosMaisConsumidos} className="header-btn">Produto</button>
                    <button onClick={this.dezServicosMaisConsumidos} className="header-btn">Serviço</button>
                </div>
                <div className="Card-container">
                    {cabecalho && (
                        <h3>{cabecalho}</h3>
                    )}
                    {clientesFiltered.length > 0 && (
                        clientesFiltered.map((c, index) => (
                            <Card key={index} className="card-main">
                                <Card.Body>
                                    <div className="card-column">
                                        <span><strong>Nome: </strong>{c.nome}</span>
                                    </div>
                                    <div className="card-column">
                                        <span><strong>Quantidade</strong> {c.qtd}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))
                    )}
                </div>
            </>
        );
    }
}

import { Component } from "react";
import Cliente from "../../modelo/cliente";
import { Card } from "react-bootstrap";
import '../css/style.css';

type State = {
    clientes: Cliente[];
    filtered: { name: string; qtd: number }[];
    cabecalho: string | null;
};

export default class MaisConsumidosServicoEProduto extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            filtered: [],
            clientes: this.getClientes(),
            cabecalho: null,
        };
    }

    getClientes = (): Cliente[] => JSON.parse(localStorage.getItem('clientes') || '[]');

    produtosMaisConsumidos = () => {
        const { clientes } = this.state;
        if (!clientes || clientes.length === 0) {
            return;
        }
        let lista: { [key: string]: number } = {};
        this.setState({ cabecalho: 'Produtos mais consumidos' });
        clientes.forEach((cliente) => {
            const produtos = cliente.produtosConsumidos || [];
            produtos.forEach((p) => {
                lista[p.nome] = (lista[p.nome] || 0) + 1;
            });
        });
        const listaArray = Object.entries(lista)
            .filter(([name, qtd]) => qtd > 0)
            .map(([name, qtd]) => ({ name, qtd }))
            .sort((a, b) => b.qtd - a.qtd);
        if(!listaArray.length){
            this.setState({cabecalho: 'Sem serviços consumidos'})
        } else{
            this.setState({ cabecalho: 'Produtos mais consumidos' });
        }
        this.setState({ filtered: listaArray });
    };
    
    servicosMaisConsumidos = () => {
        const { clientes } = this.state;
        if (!clientes || clientes.length === 0) {
            return;
        }
        let lista: { [key: string]: number } = {};
        clientes.forEach((cliente) => {
            const servicos = cliente.servicosConsumidos || [];
            servicos.forEach((s) => {
                lista[s.nome] = (lista[s.nome] || 0) + 1;
            });
        });
        const listaArray = Object.entries(lista)
            .filter(([name, qtd]) => qtd > 0)
            .map(([name, qtd]) => ({ name, qtd }))
            .sort((a, b) => b.qtd - a.qtd);
        if(!listaArray.length){
            this.setState({cabecalho: 'Sem serviços consumidos'})
        } else{
            this.setState({ cabecalho: 'Serviços mais consumidos' });
        }
        this.setState({ filtered: listaArray });
    }

    render() {
        const { filtered, cabecalho } = this.state;

        return (
            <>  
                <div className="btn-filtro">
                    <button onClick={this.produtosMaisConsumidos} className="header-btn">Produto</button>
                    <button onClick={this.servicosMaisConsumidos} className="header-btn">Serviço</button>
                </div>
                <div className="Card-container container-registro">
                    {cabecalho && <h3>{cabecalho}</h3>}
                    {filtered.length > 0 && (
                        filtered.map((c, index) => (
                            <Card key={index} className="card-main">
                                <Card.Body>
                                    <div className="card-column">
                                        <span><strong>Nome: </strong>{c.name}</span>
                                    </div>
                                    <div className="card-column">
                                        <span><strong>Quantidade: </strong>{c.qtd}</span>
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

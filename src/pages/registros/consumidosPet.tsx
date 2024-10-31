import { Component } from "react";
import Cliente from "../../modelo/cliente";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import '../css/style.css';

type State = {
    clientes: Cliente[];
    filtered: { name: string; total: number }[]
    cabecalho: string | null;
    tipo: string;
    raca: string;
    racasDisponiveis: string[];
};

export default class ConsumidosPorPet extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            filtered: [],
            clientes: this.getClientes(),
            cabecalho: null,
            tipo: '',
            raca: '',
            racasDisponiveis: []
        };
    }

    getClientes = (): Cliente[] => JSON.parse(localStorage.getItem('clientes') || '[]');

    handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tipo = e.target.value;

        const racasPorTipo: { [key: string]: string[] } = {
            Cachorro: ["Labrador", "Bulldog", "Poodle", "Pastor Alemão", "Golden Retriever", "SRD"],
            Gato: ["Persa", "Siamês", "Maine Coon", "Bengal", "Sphynx", "SRD"]
        };

        this.setState({
            tipo,
            racasDisponiveis: racasPorTipo[tipo] || [], 
            raca: ''
        });
    };

    handleRacaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ raca: e.target.value });
    };

    filtrarProdutosConsumidos = () => {
        const { clientes, tipo, raca } = this.state;
        if (!clientes || clientes.length === 0) return;

        let clientesFiltrados = clientes.filter(cliente => 
            cliente.pets.some((pet: any) => 
                (tipo ? pet.tipo === tipo : true) && (raca ? pet.raca === raca : true)
            )
        );

        if (clientesFiltrados.length === 0) {
            this.setState({
                filtered: [],
                cabecalho: `Sem produtos para ${
                    tipo && raca ? `${tipo} e ${raca}` : tipo ? tipo : raca ? raca : "nenhum filtro selecionado"
                }`
            });
            return;
        }

        let lista: { [key: string]: { valor: number, count: number } } = {};
        this.setState({ cabecalho: 'Produtos mais consumidos' });

        clientesFiltrados.forEach((cliente) => {
            cliente.produtosConsumidos.forEach((p) => {
                if (lista[p.nome]) {
                    lista[p.nome].count += 1; 
                } else {
                    lista[p.nome] = { valor: p.valor, count: 1 }; 
                }
            });
        });

        const listaArray = Object.entries(lista)
            .map(([name, { valor, count }]) => ({ name, total: valor * count }))
            .sort((a, b) => b.total - a.total);

        this.setState({ filtered: listaArray });
    };

    filtrarServicosConsumidos = () => {
        const { clientes, tipo, raca } = this.state;
        if (!clientes || clientes.length === 0) return;

        let clientesFiltrados = clientes.filter(cliente => 
            cliente.pets.some((pet: any) => 
                (tipo ? pet.tipo === tipo : true) && (raca ? pet.raca === raca : true)
            )
        );

        if (clientesFiltrados.length === 0) {
            this.setState({
                filtered: [],
                cabecalho: `Sem serviços para ${
                    tipo && raca ? `${tipo} e ${raca}` : tipo ? tipo : raca ? raca : "nenhum filtro selecionado"
                }`
            });
            return;
        }

        let lista: { [key: string]: { valor: number, count: number } } = {};
        this.setState({ cabecalho: 'Serviços mais consumidos' });

        clientesFiltrados.forEach((cliente) => {
            cliente.servicosConsumidos.forEach((s) => {
                if (lista[s.nome]) {
                    lista[s.nome].count += 1; 
                } else {
                    lista[s.nome] = { valor: s.valor, count: 1 }; 
                }
            });
        });

        const listaArray = Object.entries(lista)
            .map(([name, { valor, count }]) => ({ name, total: valor * count }))
            .sort((a, b) => b.total - a.total);

        this.setState({ filtered: listaArray });
    };

    render() {
        const { filtered, cabecalho, tipo, raca, racasDisponiveis } = this.state;

        return (
            <div className="container-fluid valor-filtro">
                <h2>Filtrar por Tipo e/ou Raça de Pet</h2>
                <Row className="mb-3">
                    <Col>
                        <Form.Select onChange={this.handleTipoChange} value={tipo}>
                            <option value="">Selecione o Tipo</option>
                            <option value="Cachorro">Cachorro</option>
                            <option value="Gato">Gato</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select onChange={this.handleRacaChange} value={raca} disabled={!racasDisponiveis.length}>
                            <option value="">Selecione a Raça</option>
                            {racasDisponiveis.map((raca, index) => (
                                <option key={index} value={raca}>{raca}</option>
                            ))}
                        </Form.Select>
                    </Col>
                </Row>
                <div className="btn-filtro mb-3">
                    <button onClick={this.filtrarProdutosConsumidos} className="header-btn">Filtrar Produtos</button>
                    <button onClick={this.filtrarServicosConsumidos} className="header-btn">Filtrar Serviços</button>
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
                                        <span><strong>Valor Total: </strong>{c.total.toFixed(2)}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        );
    }
}

import { Component } from "react";
import { Card } from "react-bootstrap";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import '../css/style.css'
import Produto from "../../modelo/produto";
import Servico from "../../modelo/servico";

type Props = {
    id: number;
    nome: string;
    produtosConsumidos: Produto[];
    servicosConsumidos: Servico[];
};

type State = {
    show: boolean;
    produtosContados: { [key: string]: number };
    servicosContados: { [key: string]: number };
};

export default class ConsumoCard extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            show: false,
            produtosContados: this.listarProduto(),
            servicosContados: this.listarServico()
        };
    }

    toggleShow = () => this.setState({ show: !this.state.show });

    listarProduto() {
        let produtos: { [key: string]: number } = {};
        this.props.produtosConsumidos.forEach((p) => {
            if (!produtos[p.nome]) {
                produtos[p.nome] = 0;
            }
            produtos[p.nome] += 1;
        });
        return produtos;
    }

    listarServico() {
        let servicos: { [key: string]: number } = {};
        this.props.servicosConsumidos.forEach((s) => {
            if (!servicos[s.nome]) {
                servicos[s.nome] = 0;
            }
            servicos[s.nome] += 1;
        });
        return servicos;
    }

    render() {
        const { produtosContados, servicosContados } = this.state;

        return (
            <>
                <Card key={this.props.id} className="card-main">
                    <Card.Body>
                        <div className="card-item">
                            <div className="card-column">
                                <span><strong>Nome:</strong> {this.props.nome}</span>
                            </div>
                            <div className="card-icons">
                                {this.state.show ? 
                                    <BsArrowUp onClick={this.toggleShow} style={{ color: 'blue'}} className="icon"/> : 
                                    <BsArrowDown onClick={this.toggleShow} style={{ color: 'blue'}} className="icon" />
                                }
                            </div>
                        </div>
                        {this.state.show && (
                            <div className="card-infos">
                                <div className="card-sub-infos">
                                    <strong>Produtos Consumidos:</strong>
                                    {Object.entries(produtosContados).length > 0 ? (
                                        Object.entries(produtosContados).map(([nome, quantidade], index) => (
                                            <span key={index}>
                                                Produto: {nome}, quantidade: {quantidade}
                                            </span>
                                        ))
                                    ) : (
                                        <span>Sem produtos cadastrados</span>
                                    )}
                                </div>
                                <div className="card-sub-infos">
                                    <strong>Serviços Consumidos:</strong>
                                    {Object.entries(servicosContados).length > 0 ? (
                                        Object.entries(servicosContados).map(([nome, quantidade], index) => (
                                            <span key={index}>
                                                Serviço: {nome}, quantidade: {quantidade}
                                            </span>
                                        ))
                                    ) : (
                                        <span>Sem serviços cadastrados</span>
                                    )}
                                </div>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </>
        );
    }
}

import { Component } from "react";
import { Card } from "react-bootstrap";
import { BsFillPencilFill, BsXLg } from "react-icons/bs";

type Produto = {
    id: number
    nome: string
    valor: number
    quantidade: number
    onExcluir: (id: number) => void
}

export default class ProdutoCard extends Component<Produto>{
    constructor(props: Produto){
        super(props)
    }

    render(){
        return(
            <>
                <Card key={this.props.id} className="card-main">
                    <Card.Body>
                        <div className="card-item">
                            <div className="card-column">
                                <span><strong>Nome: </strong>{this.props.nome}</span>
                            </div>
                            <div className="card-column">
                                <span><strong>Valor: </strong>R${(this.props.valor).toFixed(2)}</span>
                            </div>
                            <div className="card-column">
                                <span><strong>Quantidade: </strong>{this.props.quantidade}</span>
                            </div>
                            <div className="card-icons">
                            <a href={`/produto/atualizar/${this.props.id}`} style={{ color: 'blue' }}>
                                <BsFillPencilFill />
                            </a>
                            <BsXLg className="icon" style={{ color: 'red' }} onClick={() => this.props.onExcluir(this.props.id)} />
                        </div>
                        </div>
                    </Card.Body>
                </Card>
            </>
        )
    }
}
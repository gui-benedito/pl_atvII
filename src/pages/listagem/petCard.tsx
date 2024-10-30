import { Component } from "react";
import { Card } from "react-bootstrap";
import { BsArrowDown, BsArrowUp, BsFillPencilFill, BsXLg } from "react-icons/bs";
import '../css/style.css'

type Props = {
    nome: string;
    genero: string;
    tipo: string;
    raca: string
    tutorId: number
    tutorNome: string
    onExcluir: (id: number, nome: string) => void;
};

type State = {
    show: boolean;
};

export default class PetCard extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    toggleShow = () => this.setState({ show: !this.state.show });

    render() {
        return (
            <>
                <Card key={`${this.props.tutorId}-${this.props.nome}`} className="card-main">
                    <Card.Body>
                    <div className="card-item">
                        <div className="card-column">
                            <span><strong>Nome:</strong> {this.props.nome}</span>
                        </div>
                        <div className="card-column">
                            <span><strong>Raça:</strong> {this.props.raca}</span>
                        </div>
                        <div className="card-column">
                            <span><strong>Gênero:</strong> {this.props.genero}</span>
                        </div>
                        <div className="card-column">
                            <span><strong>Tipo:</strong> {this.props.tipo}</span>
                        </div>
                        <div className="card-column">
                            <span><strong>Tutor:</strong> {this.props.tutorNome}</span>
                        </div>
                        <div className="card-icons">
                            <a href={`/pet/atualizar/${this.props.tutorId}/${this.props.nome}`} style={{ color: 'blue' }}>
                                <BsFillPencilFill />
                            </a>
                            <BsXLg className="icon" style={{ color: 'red' }} onClick={() => this.props.onExcluir(this.props.tutorId, this.props.nome)} />
                        </div>
                    </div>
                    </Card.Body>
                </Card>
            </>
        );
    }
}

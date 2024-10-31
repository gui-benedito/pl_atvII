import { Component } from "react";
import { Card } from "react-bootstrap";
import { BsArrowDown, BsArrowUp, BsFillPencilFill, BsXLg } from "react-icons/bs";
import '../css/style.css'

type Pet = {
    nome: string;
    genero: string;
    tipo: string;
    raca: string
};

type Props = {
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
    pets: Pet[];
    onExcluir: (id: number) => void;
};

type State = {
    show: boolean;
};

export default class ClienteCard extends Component<Props, State> {
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
                <Card key={this.props.id} className="card-main">
                    <Card.Body>
                    <div className="card-item">
                        <div className="card-column">
                            <span><strong>Nome Social:</strong></span><span> {this.props.nomeSocial}</span>
                        </div>
                        <div className="card-column">
                            {this.props.telefones && Array.isArray(this.props.telefones) ? (
                                this.props.telefones.map((t, idx) => (
                                    <><span key={idx}><strong>Telefone:</strong> </span><span>({t.ddd}) {t.numero}</span></>
                                ))
                            ) : (
                                <p><strong>Telefone:</strong> N/A</p>
                            )}
                        </div>
                        <div className="card-column">
                            <span><strong>Email:</strong></span><span> {this.props.email}</span>
                        </div>
                        <div className="card-icons">
                            {this.state.show ? 
                                <BsArrowUp onClick={this.toggleShow} style={{ color: 'blue'}} className="icon"/> : 
                                <BsArrowDown onClick={this.toggleShow} style={{ color: 'blue'}} className="icon" 
                                />
                            }
                            <a href={`/cliente/atualizar/${this.props.id}`} style={{ color: 'blue' }}>
                                <BsFillPencilFill />
                            </a>
                            <BsXLg className="icon" style={{ color: 'red' }} onClick={() => this.props.onExcluir(this.props.id)} />
                        </div>
                    </div>
                        {this.state.show && (
                            <>
                                <div className="card-infos">
                                    <div className="card-column">
                                        <span><strong>Nome:</strong> {this.props.nome}</span>
                                    </div>
                                    <div className="card-column docs">
                                        <span><strong>CPF:</strong> {this.props.cpf.valor}</span>
                                        <span><strong>Data de Emissão:</strong> {this.props.cpf.dataEmissao}</span>
                                    </div>
                                    <div className="card-column docs">
                                        <span><strong>RG:</strong> {this.props.rg.valor}</span>
                                        <span><strong>Data de Emissão:</strong> {this.props.rg.dataEmissao}</span>
                                    </div>
                                </div>
                                <div className="card-infos-pets">
                                    {this.props.pets.length > 0 && (
                                        <>
                                            <h6>Pets:</h6>
                                            {this.props.pets.map((pet, index) => (
                                                <span key={index}><strong>Nome:</strong> {pet.nome}</span>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </Card.Body>
                </Card>
            </>
        );
    }
}

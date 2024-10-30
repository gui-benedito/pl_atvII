import { Component } from "react";
import PetCard from "./petCard";
import imgSemCliente from "../../images/lista-vazia.jpg"
import Modal from "../../componentes/Modal";

type PetType = {
    nome: string
    raca: string
    tipo: string
    genero: string
    tutorId: number
    tutorNome: string
}

export default class ListaPet extends Component<{}, { pets: PetType[], openModalExcluir: boolean, openModalMensagem: boolean, tutorId: number | null,  petNome: string}>{
    constructor(props: {}) {
        super(props);
        this.state = {
            pets: this.getPets(),
            openModalExcluir: false,
            openModalMensagem: false,
            tutorId: null,
            petNome: ''
        };
    }

    getPets = (): PetType[] => {
        const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
        const pets: PetType[] = [];
        
        for (const cliente of clientes) {
            for (const pet of cliente.pets) {
                const newPet = {
                    tutorId: cliente.id,
                    tutorNome: cliente.nome,
                    nome: pet.nome,
                    raca: pet.raca,
                    tipo: pet.tipo,
                    genero: pet.genero
                };
                pets.push(newPet);
            }
        }
        return pets;
    }

    closeModalMensagem = () => {
        this.setState({ openModalMensagem: false });
    };

    closeModalExcluir = () => this.setState({ openModalExcluir: false });

    openModalConfirmaExcluir = (tutorId: number, petNome: string) => this.setState({ openModalExcluir: true, tutorId: tutorId, petNome: petNome});

    confirmaExcluir = () => {
        const { tutorId, petNome } = this.state
        const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
        for(const cliente of clientes){
            if(cliente.id === tutorId){
                const i = cliente.pets.findIndex((p: { nome: string; }) => p.nome === petNome)
                const petRemovido = cliente.pets.splice(i, 1)
                if(petRemovido){    
                    (localStorage.setItem('clientes', JSON.stringify(clientes)))
                    this.setState({ pets: this.getPets(), tutorId: null, petNome: '', openModalExcluir: false })
                    this.setState({ openModalMensagem: true })
                    break
                }
            }
        }
        return
    }

    render(){
        const { pets, openModalExcluir, openModalMensagem } = this.state

        return(
            <>  
                <div className="header">
                    <h2>Lista de Pets</h2>
                    <a href="/pet" key="lista"><button  className="header-btn">Lista</button></a>
                    <a href="/pet/cadastro" key="cadastrar"><button  className="header-btn">Cadastrar</button></a>
                </div>
                {pets.length <= 0 ? 
                    <div className="lista-vazia">
                        <img src={imgSemCliente}/>
                    </div>
                :
                    <>
                        {pets.map((p) => (
                            <PetCard 
                                key={`${p.tutorId}-${p.nome}`}
                                nome={p.nome} 
                                genero={p.genero} 
                                tipo={p.tipo} 
                                raca={p.raca} 
                                tutorId={p.tutorId} 
                                tutorNome={p.tutorNome}
                                onExcluir={() => this.openModalConfirmaExcluir(p.tutorId, p.nome)} 
                            />
                        ))}
                    </>
                }

                <Modal
                    isOpen={openModalExcluir}
                    label="Confirma a exclusão do pet?"
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
                    label="Pet excluído com sucesso"
                    buttons={
                        <div className="confirma-buttons">
                            <button onClick={this.closeModalMensagem} className="btn btn-secondary">Ok</button>
                        </div>
                    }
                >
                    <></>
                </Modal>
            </>
        )
    }
}
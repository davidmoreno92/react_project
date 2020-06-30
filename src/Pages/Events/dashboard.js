import React from 'react';
import { Table } from 'react-bootstrap';
import { CardList, PlusSquareFill } from 'react-bootstrap-icons';

import EventService from "../../Services/event-service";

import Modal from '../../Components/Modal/modal';
import EventList from '../../Components/Event/event-list';
import EventForm from '../../Components/Event/event-form';
import './dashboard.scss';


class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { gamesEvents: [], showModal: false, showModalAdd: false, game: {}};
    }

    showModal = e => {
        this.setState({
            showModal: !this.state.showModal
        });
    };

    showModalAdd = (game) => {
        this.setState({
            showModalAdd: !this.state.showModalAdd,
            game: game
        });
    };

    async componentDidMount() {
        await (EventService.getEvents()).then(gamesEvents => {
            this.setState({ gamesEvents: gamesEvents });
        })
    }

    paintTable = (component) => {
        return <Table className="w-100" striped hover size="sm">
            <thead>
                <tr>
                    <th>Nombre del evento</th>
                    <th>Fecha inicio</th>
                    <th>Fecha fin</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            {component}
        </Table>
    }

    render() {
        return (
            <div className="main-wrapper">
                <div className="container">
                    <div className="content-box mx-auto mt-4 w-100">
                        <div className="game-list">
                            <h3>
                                <CardList size={37} />
                                <span className="pl-2 align-text-bottom">Lista de eventos</span>
                            </h3>

                            {this.state.gamesEvents.data &&
                                this.state.gamesEvents.data.map((game, index) => (
                                    <div className="game-info py-4" key={index}>
                                        <h5>
                                            <img src={`/media/${game.image}`} alt={`game ${game.name} icon`} /> {game.name}
                                            <div className="float-right">
                                                <PlusSquareFill onClick={e => { this.showModalAdd(game); }} className="text-success float-right" size={32} />
                                            </div>
                                        </h5>

                                        {game.events.length > 0 ?
                                            this.paintTable(<EventList gameEvents={game.events}></EventList>) : ''}

                                        {game.events.length > 3 ?
                                            <div className="float-right">
                                                <button onClick={e => { this.showModal(); }}>
                                                    Ver más eventos
                                        </button>
                                            </div> : ''}

                                        {this.state.showModal ?
                                            <Modal modalTitle={`Eventos de ${game.name}`} onClose={this.showModal} showModal={this.state.showModal}>
                                                {this.paintTable(<EventList gameId={game.id} gameEvents={game.events}></EventList>)}
                                            </Modal> : ''}
                                    </div>
                                ))}
                            {this.state.showModalAdd ?
                                <Modal modalTitle={`Añadir un nuevo evento para ${this.state.game.name}`} onClose={this.showModalAdd} showModal={this.state.showModalAdd}>
                                    <EventForm></EventForm>
                                </Modal> : ''}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default DashBoard;
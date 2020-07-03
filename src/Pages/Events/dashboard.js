import React from 'react';
import { Form, Table, InputGroup} from 'react-bootstrap';
import { CardList, PlusSquareFill } from 'react-bootstrap-icons';
import Select from 'react-select'

import './dashboard.scss';
import Modal from '../../Components/Modal/modal';
import EventList from '../../Components/Event/event-list';
import EventForm from '../../Components/Event/event-form';
import gamesService from '../../Services/games-service';
import eventService from '../../Services/event-service';


class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { gamesSelector: [], gamesSelected: [], gamesWithEvents: [], showModal: false, showModalAdd: false };
    }

    toggleModal = e => {
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

/*     handleCheckGames = (games) => {
        let gamesSelected = [...this.state.gamesSelected];
        let gamesWithEvents =  [...this.state.gamesWithEvents];

        for (let i = 0; i < games.length ; i++) {
            let game = games[i];
            if (!gamesSelected.find(g => g.value === game.value)) {
                game.id = game.value;
                game.name = game.label;
                game.events = this.getGameEvents(game.value).then (data => {
                    gamesSelected.push(game);
                    gamesWithEvents.push(game);
                    this.setState({ gamesSelected: gamesSelected, gamesWithEvents: gamesWithEvents });
                    console.log('gamesSelected THEN', gamesSelected);
                });
            }
        }
    }
 */

    handleCheckGames = (games) => {
        if (games) {
            this.setState({ gamesSelected: games});
            let gamesWithEvents =  [...this.state.gamesWithEvents];
            
            for (let i = 0; i < games.length ; i++) {
                let game = games[i];
                if (!gamesWithEvents.find(g => g.id === game.value)) {
                    game.id = game.value;
                    game.name = game.label;
                    this.getGameEvents(game.value).then (data => {
                        game.events = data;
                        gamesWithEvents.push(game);
                        this.setState({ gamesWithEvents: gamesWithEvents });
                    });
                }
            }
        }
        else {
            this.setState({ gamesSelected: []});
        }
    }


    async getGameEvents(gameId) {
        return eventService.getEventsByGame(gameId, 10).then(events => {
            return events;
        });
    }

    async componentDidMount() {
        gamesService.getGames().then(async games => {
            let gamesSelected= [];
            let gamesWithEvents = games.filter(g => g.name === '21 Jack' || g.name === 'Solitaire');

            for (let i = 0; i < gamesWithEvents.length ; i++) {
                gamesWithEvents[i].events = await this.getGameEvents(gamesWithEvents[i].id);
                gamesSelected.push({label: gamesWithEvents[i].name, value: gamesWithEvents[i].id});
            }
            
            let gameOptions = games.map((i) => ({ label: i.name, value: i.id }));
            this.setState({ gamesSelector: gameOptions, gamesSelected: gamesSelected, gamesWithEvents: gamesWithEvents});
        });
    }

    getGameImage = (gameName) => {
        if (gameName) {
            gameName = (gameName.replace(/ /g, '')).toLowerCase();
            return `/media/${gameName}icon.png`;
        }
        else {
            return `/media/Img_icon.svg`;
        }
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
        let gamesToShow = [];

        this.state.gamesSelected.forEach( game => {

            let gameData = this.state.gamesWithEvents.find(g => g.id === game.value);
            if (gameData) {
                gamesToShow.push(gameData);
            }
        });

        const selectStyles = { menu: styles => ({ ...styles, zIndex: 999 }) };
        return (
            <div className="main-wrapper">
                <div className="container">
                    <div className="content-box mx-auto mt-4 w-100">
                        <div className="game-list">
                            <div className="list-header">
                                <CardList  className="float-left"size={37} />
                                <h3 className="float-left"><span className="pl-2 align-text-bottom">Lista de eventos</span></h3>
                                <span className="game-filter float-right">
                                <Form.Group>
                                    {this.state.gamesSelector ?
                                        <InputGroup className="games-group">
                                             Filtrar <Select required styles={selectStyles} className="w-100" isMulti placeholder="Filtrar" options={this.state.gamesSelector} name="gamesSelected" value={this.state.gamesSelected} onChange={e => { this.handleCheckGames(e); }}/>
                                        </InputGroup>
                                    : ''}
                                </Form.Group>
                                </span>
                            </div>
                            {gamesToShow &&
                                gamesToShow.map((game, index) => (
                                    <div className="game-info py-4" key={index}>
                                        <h5>
                                            <img src={this.getGameImage(game.name)} alt={`game ${game.name} icon`} /> {game.name}
                                            <div className="float-right">
                                                <PlusSquareFill onClick={e => { this.showModalAdd(game); }} className="text-success float-right" size={32} />
                                            </div>
                                        </h5>
                                        {/* <div>{JSON.stringify(game)}</div> */}
                                        {game.events && game.events.length > 0 ?
                                            this.paintTable(<EventList gameEvents={game.events}></EventList>) : 'asdasd'}

                                        {game.events && game.events.length > 1 ?
                                            <div className="float-right">
                                                <button onClick={e => { this.toggleModal(); }}>
                                                    Ver más eventos 
                                                </button>
                                            </div> : ''}

                                            <Modal modalTitle={`Eventos de ${game.name}`} onClose={e => { this.toggleModal(); }} showModal={this.state.showModal}>
                                                {this.paintTable(<EventList gameId={game.id} gameEvents={game.events}></EventList>)}
                                            </Modal>
                                    </div>
                            ))}
                            {this.state.showModalAdd ?
                                <Modal modalTitle={`Añadir un nuevo evento para ${this.state.game.name}`} onClose={this.showModalAdd} showModal={this.state.showModalAdd}>
                                    <EventForm isEditable={true}></EventForm>
                                </Modal> : ''}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default DashBoard;
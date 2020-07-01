import React from 'react';
import Moment from 'react-moment';

import { Link } from 'react-router-dom';
import { Form, Button, ButtonGroup, Table } from 'react-bootstrap';
import { Eye, Pencil, Trophy, Stickies } from 'react-bootstrap-icons';
import './event-list.scss'
import EventService from "../../Services/event-service";
import Modal from '../../Components/Modal/modal';
import EventForm from '../../Components/Event/event-form';
import EventStatistics from './event-statistics';

class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameEvents: this.props.gameEvents,
            showModalEdit: false,
            showModalSee: false,
            showModalStatistics: false,
            showModalCopy: false,
            eventToEdit: {},
            eventToSee: {},
            eventToSeeStatistics: {},
            eventToCopy: {}
        };
        //dummy means it just print data, component doesn't need to load data from api.
    }

    componentDidMount() {
        if (this.props.gameId) {
            EventService.getEventsByGame(this.props.gameId).then(gamesEvents => {
                this.setState({ gameEvents: gamesEvents.events });
            })
        }
    }

    showModalEdit = (eventToEdit) => {
        this.setState({
            showModalEdit: !this.state.showModalEdit,
            eventToEdit: eventToEdit
        });
    };

    showModalCopy = (eventToCopy) => {
        this.setState({
            showModalCopy: !this.state.showModalCopy,
            eventToCopy: eventToCopy
        });
    };

    showModalSee = (eventToSee) => {
        this.setState({
            showModalSee: !this.state.showModalSee,
            eventToSee: eventToSee
        });
    };

    showModalStatistics = (eventToSeeStatistics) => {
        this.setState({
            showModalStatistics: !this.state.showModalStatistics,
            eventToSeeStatistics: eventToSeeStatistics
        });
    };

    render() {
        const todayInMillis = new Date().getTime();

        return (
            <tbody>
                {this.state.gameEvents && 
                    this.state.gameEvents.map((event, index) => (
                        <tr key={index}>
                            <td>{event.name}</td>
                            <td><Moment format="D/MM/YYYY">{parseInt(event.date_start)}</Moment></td>
                            <td><Moment format="D/MM/YYYY">{parseInt(event.date_finish)}</Moment></td>
                            <td>
                                <span className={`font-weight-bold ${event.status === 'Activo' ? 'text-danger' : event.status === 'Finalizado' ? 'text-success' : ''}`}>
                                    {event.status}
                                </span>
                            </td>
                            <td className="action-icons">
                                <Eye onClick={e => { this.showModalSee(event); }} className="text-white bg-secondary" size={40}/>
                                <Stickies onClick={e => { this.showModalCopy(event); }} className="text-white bg-info" size={40}/>
                                {event.status !== 'Finalizado' ?
                                    <Pencil onClick={e => { this.showModalEdit(event); }} className="text-white bg-primary" size={40} /> : ''}
                                {todayInMillis >= event.date_start ?
                                    <Trophy onClick={e => { this.showModalStatistics(event); }}className="text-white bg-gold" size={40} /> : ''}
                            </td>
                        </tr>
                    ))}
                    {this.state.showModalEdit ?
                        <Modal modalTitle={`Editar evento ${this.state.eventToEdit.name}`} onClose={this.showModalEdit} showModal={this.state.showModalEdit}>
                            <EventForm eventInfo={this.state.eventToEdit} isEditable={true}></EventForm>
                        </Modal> : ''}
                    {this.state.showModalSee ?
                        <Modal modalTitle={`Información del evento ${this.state.eventToSee.name}`} onClose={this.showModalSee} showModal={this.state.showModalSee}>
                            <EventForm eventInfo={this.state.eventToSee} isEditable={false}></EventForm>
                        </Modal> : ''}
                    {this.state.showModalStatistics ?
                        <Modal modalTitle={`Estadísticas del evento ${this.state.eventToSeeStatistics.name}`} onClose={this.showModalStatistics} showModal={this.state.showModalStatistics}>
                            <EventStatistics eventInfo={this.state.eventToSeeStatistics}></EventStatistics>
                        </Modal> : ''}
                    {this.state.showModalCopy ?
                    <Modal modalTitle={`Copia del evento ${this.state.eventToCopy.name}`} onClose={this.showModalCopy} showModal={this.state.showModalCopy}>
                        <EventForm eventInfo={this.state.eventToCopy} isCopy={true} isEditable={true}></EventForm>
                    </Modal> : ''}
            </tbody>
        )
    }
}


export default EventList;
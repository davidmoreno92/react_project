import React from 'react';
import Moment from 'react-moment';
import { Form, InputGroup, FormControl, Button, ButtonGroup, Table } from 'react-bootstrap';
import { Eye, Pencil, Trophy } from 'react-bootstrap-icons';
import './event-list.scss'
import EventService from "../../Services/event-service";
import GamesService from "../../Services/games-service";
import EventModel from '../../Models/Event'
import Select from 'react-select'

class EventForm extends React.Component {
    constructor(props) {
        super(props);
        let eventModel = new EventModel();
        this.state = {
            eventInfo: this.props.eventInfo ? this.props.eventInfo : eventModel,
            changed: false,
            gamesOptions: [],
            gamesSelected: []
        };
    }

    async componentDidMount() {
        await (GamesService.getGames()).then( games => {
            this.setState({gamesOptions: games})
        });

        console.log(this.state.gamesOptions);
    }

    handleChanges = e => {
        const { name, value } = e.target;
        const eventInfo = this.state.eventInfo;
        eventInfo[name] = value;
        this.setState({ eventInfo: eventInfo });
        console.log(this.state.eventInfo);
    };

    handleChangesAdd = e => {
        this.setState({ gamesSelected: e });
    };

    render() {
        
        console.log(this.state.gamesSelected);
        return (
             //Check if isEditable or disable all inputs this.props.isEditable
            <div>
                {this.props.eventInfo ?
                <fieldset disabled={!this.props.isEditable}>
                  <Form>
                    <label htmlFor="potType">Tipo de evento</label>
                    <InputGroup className="pot-type-group" onChange={this.handleChanges}>
                        <Form.Check type="radio" name="potType" value="S"/> Especie 
                        <Form.Check type="radio" name="potType" value="R"/> Dinero
                    </InputGroup>
                    <label htmlFor="feeType">Tipo de entrada</label>
                    <InputGroup className="fee-type-group" onChange={this.handleChanges}>
                        <Form.Check type="radio" name="feeType" value="S"/> Especie 
                        <Form.Check type="radio" name="feeType" value="R"/> Dinero
                    </InputGroup>
                    <label htmlFor="games">Para qué juegos quieres publicar el evento?</label>
                    {this.state.gamesOptions ?
                        <InputGroup className="games-group">
                            <Select isMulti options={this.state.gamesOptions} name="gamesSelected" onChange={this.handleChangesAdd}/>
                        </InputGroup>
                    : ''}
                  </Form>
                  
                </fieldset>
                :  <div> NO HAY EVENT</div>}
            </div>
        )
    }
}


export default EventForm;
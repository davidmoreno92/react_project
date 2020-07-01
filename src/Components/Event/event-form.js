import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { Form, InputGroup, FormControl, Button, ButtonGroup, Table } from 'react-bootstrap';
import { Eye, Pencil, Trophy, CalendarEvent, Plus } from 'react-bootstrap-icons';
import './event-form.scss'
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
        registerLocale("es", es);
    }

    async componentDidMount() {
        await (GamesService.getGames()).then((data) => {
            let games = data.map((i) => ({ label: i.name, value: i.id }));
            this.setState({gamesOptions: games})
          });
    }

    handleChanges = e => {
        console.log(e);
        const { name, value } = e.target;
        const eventInfo = this.state.eventInfo;
        eventInfo[name] = value;
        this.setState({ eventInfo: eventInfo });
        console.log(this.state.eventInfo);
    };

    handleChangesDate = (target, date) => {
        const eventInfo = this.state.eventInfo;
        eventInfo[target] = moment(date).format('x');
        this.setState({ eventInfo: eventInfo });
      };
      
    handleChangesAdd = e => {
        this.setState({ gamesSelected: e });
    };

/*     buildRewards = () => {
        let htmlRewards = [];
        currentEvent.rewards.forEach((reward, i) => {
            let amountId = `amount-${i}`,
              currencyId = `currency-${i}`,
              positionId = `position-${i}`;
            
              htmlRewards.push(
              
                )
        });
    }

    addReward = (e) => {
        e.preventDefault();
        setEvent((prev) => {
          let newRewards = [...prev.rewards];
          newRewards.push({ ...initialState.reward });
          return { ...prev, ["rewards"]: newRewards };
        });
    }; */

    render() {
        const selectStyles = { menu: styles => ({ ...styles, zIndex: 999 }) };
        console.log(this.state.eventInfo);
        return (
             //Check if isEditable or disable all inputs this.props.isEditable
            <div className="px-5 py-3">
                <fieldset disabled={!this.props.isEditable}>
                  <Form>
                  <div className="left w-50 pr-4 float-left">
                        <Form.Group>
                            <Form.Label>Tipo de evento</Form.Label>
                            <InputGroup required className="pot-type-group" onChange={this.handleChanges}>
                                <Form.Check type="radio" name="potType" value="S"/> Especie 
                                <Form.Check className="ml-3" type="radio" name="potType" value="R"/> Dinero
                            </InputGroup>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Para qué juegos quieres publicar el evento?</Form.Label>
                            {this.state.gamesOptions ?
                                <InputGroup className="games-group">
                                    <Select required styles={selectStyles} className="w-100" isMulti placeholder="Selecciona uno o varios juegos" options={this.state.gamesOptions} name="gamesSelected" onChange={this.handleChangesAdd}/>
                                </InputGroup>
                            : ''}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nombre del evento (ES / EN)</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl required value={this.state.eventInfo.name} name="name" placeholder="Nombre del evento en Español" onChange={this.handleChanges}/>
                                <FormControl className="ml-3" required value={this.state.eventInfo.nameen} name="name-en" placeholder="Event's name in English"onChange={this.handleChanges}/>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fecha inicio / Fecha fin</Form.Label>
                            <InputGroup className="mb-3">
                                <DatePicker required styles={selectStyles} className="form-control" placeholderText="Click para seleccionar fecha" name="date_start" onChange={this.handleChangesDate.bind(this, "date_start")}
                                value={moment(this.state.eventInfo.date_start, 'x').toDate()} selected={moment(this.state.eventInfo.date_start, 'x').toDate()} showTimeSelect locale="es" withPortallocale="es" timeFormat="HH:mm" timeIntervals={15}
                                timeCaption="time" dateFormat="Pp"/>
                                <DatePicker required className="form-control ml-3" placeholderText="Click para seleccionar fecha" name="date_finish" onChange={this.handleChangesDate.bind(this, "date_finish")}
                                value={moment(this.state.eventInfo.date_finish, 'x').toDate()} selected={moment(this.state.eventInfo.date_finish, 'x').toDate()} showTimeSelect locale="es" withPortallocale="es" timeFormat="HH:mm" timeIntervals={15}
                                timeCaption="time" dateFormat="Pp"/>
                            </InputGroup>
                            
                            {this.state.eventInfo.date_start > this.state.eventInfo.date_finish ? 
                                    <p className="text-danger mt-2">La fecha de inicio no puede ser superior a la fecha de fin.</p> : ''}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Bote</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl required value={this.state.eventInfo.potAmount} name="potAmount" onChange={this.handleChanges}/>
                            </InputGroup>
                            {!!(this.state.eventInfo.minFees) && !!(this.state.eventInfo.feeAmout) ?
                                <p className="text-danger mt-2">Bote mínimo: {this.state.eventInfo.minFees * this.state.eventInfo.feeAmout}</p> 
                            : ''}
                        </Form.Group>
                    </div>
                    <div className="right w-50 pl-4 float-left">
                        <Form.Group>
                            <Form.Label>Tipo de entrada</Form.Label>
                            <InputGroup required className="pot-type-group" onChange={this.handleChanges}>
                                <Form.Check type="radio" name="feeType" value="R"/> Dinero 
                                <Form.Check className="ml-3" type="radio" name="feeType" value="F"/> GG
                                <Form.Check className="ml-3" type="radio" name="feeType" value="free"/> Gratuito
                            </InputGroup>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nº de entradas mínimo</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl type="number" required value={this.state.eventInfo.minFees} name="minFees" onChange={this.handleChanges}/>
                            </InputGroup>
                        </Form.Group>
                        {this.state.eventInfo.feeType !== 'free' ?
                            <Form.Group>
                                <Form.Label>Entrada</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl type="number" required value={this.state.eventInfo.feeAmout} name="feeAmout" onChange={this.handleChanges}/>
                                    <InputGroup.Append>
                                        <InputGroup.Text>
                                        {this.state.eventInfo.feeType === 'R' ? 
                                            <span>€</span> : <span>GG</span>}
                                        </InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form.Group>
                        : ''}
                        <Form.Group>
                            <Form.Label>Reparto de premios</Form.Label>
                            <div className="prize-box">
                                <InputGroup className="mb-3">
                                    <Form.Label>Posición</Form.Label>
                                    <FormControl type="number" required value={this.state.eventInfo.prizePosition} name="position" onChange={this.handleChanges}/>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <Form.Label>Premio</Form.Label>
                                    <FormControl type="number" required value={this.state.eventInfo.prizePrize} name="prize" onChange={this.handleChanges}/>
                                    <InputGroup.Append>
                                        <InputGroup.Text>
                                        {this.state.eventInfo.feeType === 'R' ? 
                                            <span>€</span> : <span>GG</span>}
                                        </InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <Form.Label>Imagen del premio</Form.Label>
                                    <FormControl type="file" required value={this.state.eventInfo.prizeImg} name="prizeImg" onChange={this.handleChanges}/>
                                </InputGroup>
                            </div>
                        </Form.Group>
                    </div>

                    {/* <button className="btn btn-primary margender bold" onClick={addReward}> AÑADIR PREMIO{" "}<Plus></Plus></button> */}
                  </Form>
                  
                </fieldset>
            </div>
        )
    }
}


export default EventForm;
import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import Select from 'react-select'

import "react-datepicker/dist/react-datepicker.css";
import { Form, InputGroup, FormControl, Button, ButtonGroup, Table } from 'react-bootstrap';
import { Eye, Pencil, Trophy, CalendarEvent, Plus, Gift } from 'react-bootstrap-icons';
import './event-form.scss'
import EventService from "../../Services/event-service";
import GamesService from "../../Services/games-service";
import EventModel from '../../Models/Event'


class EventForm extends React.Component {
    constructor(props) {
        super(props);
        let eventModel = new EventModel();
        this.state = {
            eventInfo: this.props.eventInfo ? this.props.eventInfo : eventModel,
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

          let eventInfoForm = {};
          eventInfoForm.created = this.state.eventInfo.created;
          eventInfoForm.date = this.state.eventInfo.date;
          eventInfoForm.end = this.state.eventInfo.end;
          eventInfoForm.feeAmount = this.state.eventInfo.fee ? this.state.eventInfo.fee.amount : '';
          eventInfoForm.feeType = this.state.eventInfo.fee ? this.state.eventInfo.fee.type : '';
          eventInfoForm.feeCurrency = this.state.eventInfo.fee ? this.state.eventInfo.fee.curency : '';
          eventInfoForm.gameId = this.state.eventInfo.gameId;
          eventInfoForm.id = this.state.eventInfo.id;
          eventInfoForm.imgUrl = this.state.eventInfo.imgUrl;
          eventInfoForm.minFees = this.state.eventInfo.minFees;
          eventInfoForm.potAmount = this.state.eventInfo.pot ? this.state.eventInfo.pot.amount : '';
          eventInfoForm.potType = this.state.eventInfo.pot ? this.state.eventInfo.pot.type : '';
          eventInfoForm.titleEs = this.state.eventInfo.title ? this.state.eventInfo.title[0].name : '';
          eventInfoForm.titleEn = this.state.eventInfo.title ? this.state.eventInfo.title[1].name : '';
          eventInfoForm.rewards = this.state.eventInfo.rewards;
          eventInfoForm.rulesEs = this.state.eventInfo.rules ? this.state.eventInfo.rules[0] : '';
          eventInfoForm.rulesEn = this.state.eventInfo.rules ?this.state.eventInfo.rules[1] : '';
          eventInfoForm.type = this.state.eventInfo.type;

          this.setState({eventInfoLocal: eventInfoForm})
    }

    handleChanges = e => {
        const { name, value } = e.target;
        const eventInfo = this.state.eventInfoLocal;
        eventInfo[name] = value;

        console.log(eventInfo);
        this.setState({ eventInfo: eventInfo });
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
        //MIO this.setState({rewards: [...this.state.rewards, ""]});

        e.preventDefault();
        setEvent((prev) => {
          let newRewards = [...prev.rewards];
          newRewards.push({ ...initialState.reward });
          return { ...prev, ["rewards"]: newRewards };
        });
    }; */

    render() {
        console.log(this.state.eventInfoLocal);
        const selectStyles = { menu: styles => ({ ...styles, zIndex: 999 }) };
        return (
            <div className="px-5 py-3">
                <fieldset disabled={!this.props.isEditable}>
                {this.state.eventInfoLocal ?
                  <Form>
                 
                    <div className="left w-50 pr-4 float-left">
                            <Form.Group>
                                <Form.Label>Tipo de evento</Form.Label>
                                <InputGroup required className="pot-type-group" onChange={this.handleChanges}>
                                    <Form.Check type="radio" checked={this.state.eventInfoLocal.potType === "S"} name="potType" value="S"/> Especie 
                                    <Form.Check className="ml-3"checked={this.state.eventInfoLocal.potType === "R"} type="radio" name="potType" value="R"/> Dinero
                                </InputGroup>
                            </Form.Group>
                            {!this.state.eventInfo.gameId ?
                            <Form.Group>
                                <Form.Label>Para qué juegos quieres publicar el evento?</Form.Label>
                                {this.state.gamesOptions ?
                                    <InputGroup className="games-group">
                                        <Select required styles={selectStyles} className="w-100" isMulti placeholder="Selecciona uno o varios juegos" options={this.state.gamesOptions} name="gamesSelected" onChange={this.handleChangesAdd}/>
                                    </InputGroup>
                                : ''}
                            </Form.Group>
                            : ''}
                            <Form.Group>
                                <Form.Label>Nombre del evento (ES / EN)</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl required value={this.state.eventInfoLocal.titleEs} name="titleEs" placeholder="Nombre del evento en Español" onChange={this.handleChanges}/>
                                    <FormControl className="ml-3" required value={this.state.eventInfoLocal.titleEn} name="titleEn" placeholder="Event's name in English"onChange={this.handleChanges}/>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Fecha inicio / Fecha fin</Form.Label>
                                <InputGroup className="mb-3">
                                    <DatePicker required styles={selectStyles} className="form-control" placeholderText="Click para seleccionar fecha" name="date" onChange={this.handleChangesDate.bind(this, "date")}
                                    value={moment(this.state.eventInfoLocal.date, 'x').toDate() || new Date().toDate()} selected={moment(this.state.eventInfoLocal.date, 'x').toDate() || new Date().toDate()} showTimeSelect locale="es" withPortallocale="es" timeFormat="HH:mm" timeIntervals={15}
                                    timeCaption="time" dateFormat="Pp"/>

                                    <DatePicker required className="form-control ml-3" placeholderText="Click para seleccionar fecha" name="end" onChange={this.handleChangesDate.bind(this, "end")}
                                    value={moment(this.state.eventInfoLocal.end, 'x').toDate()} selected={moment(this.state.eventInfoLocal.end, 'x').toDate()} showTimeSelect locale="es" withPortallocale="es" timeFormat="HH:mm" timeIntervals={15}
                                    timeCaption="time" dateFormat="Pp"/>
                                </InputGroup>
                                
                                {this.state.eventInfoLocal.date > this.state.eventInfoLocal.end ? 
                                        <p className="text-danger mt-2">La fecha de inicio no puede ser superior a la fecha de fin.</p> : ''}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Bote</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl required value={this.state.eventInfoLocal.potAmount} name="potAmount" onChange={this.handleChanges}/>
                                </InputGroup>
                                {!!(this.state.eventInfoLocal.minFees) && !!(this.state.eventInfoLocal.feeAmout) ?
                                    <p className="text-danger mt-2">Bote mínimo: {this.state.eventInfoLocal.minFees * this.state.eventInfoLocal.feeAmout}</p> 
                                : ''}
                            </Form.Group>
                        </div>
                        <div className="right w-50 pl-4 float-left">
                            <Form.Group>
                                <Form.Label>Tipo de entrada</Form.Label>
                                <InputGroup required className="pot-type-group" onChange={this.handleChanges}>
                                    <Form.Check type="radio" checked={this.state.eventInfoLocal.feeType === "R"}name="feeType" value="R"/> Dinero 
                                    <Form.Check className="ml-3" checked={this.state.eventInfoLocal.feeType === "F"} type="radio" name="feeType" value="F"/> GG
                                    <Form.Check className="ml-3" checked={this.state.eventInfoLocal.feeType === "F" && this.state.eventInfoLocal.feeAmount === 0} type="radio" name="feeType" value="free"/> Gratuito
                                </InputGroup>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Nº de entradas mínimo</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl type="number" required value={this.state.eventInfoLocal.minFees} name="minFees" onChange={this.handleChanges}/>
                                </InputGroup>
                            </Form.Group>
                                <Form.Group>
                                    <Form.Label>Entrada</Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl disabled={this.state.eventInfoLocal.feeType === 'free'} type="number" required value={this.state.eventInfoLocal.feeAmount} name="feeAmount" onChange={this.handleChanges}/>
                                        <InputGroup.Append>
                                            <InputGroup.Text>
                                            {this.state.eventInfoLocal.feeType === 'R' ? 
                                                <span>€</span> : <span>GG</span>}
                                            </InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>
                            <Form.Group>
                                <Form.Label>Reparto de premios</Form.Label>
                                <Form.Group>
                                    <Form.Label>Tipo de premios</Form.Label>
                                    <InputGroup required className="pot-type-group" onChange={this.handleChanges}>
                                        <Form.Check type="radio" name="prizeType" value="R"/> Dinero 
                                        <Form.Check className="ml-3" type="radio" name="prizeType" value="F"/> GG
                                        <Form.Check className="ml-3" type="radio" name="prizeType" value="S"/> Especie
                                    </InputGroup>
                                </Form.Group>
                                <div className="prize-box">
                                    <InputGroup className="mb-3">
                                        <Form.Label className="w-100">Posición</Form.Label>
                                        <FormControl type="number" required value={this.state.eventInfoLocal.prizePosition} name="position" onChange={this.handleChanges}/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <Form.Label className="w-100">Premio</Form.Label>
                                        <FormControl type={this.state.eventInfoLocal.prizeType === 'S' ? 'text' : 'number'} required value={this.state.eventInfoLocal.prizePrize} name="prize" onChange={this.handleChanges}/>
                                        <InputGroup.Append>
                                            <InputGroup.Text>
                                            {this.state.eventInfoLocal.prizeType === 'R' ? 
                                                <span>€</span> : this.state.eventInfoLocal.prizeType === 'F' ? <span>GG</span> : <span><Gift></Gift></span>}
                                            </InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <Form.Label className="w-100">Imagen del premio</Form.Label>
                                        <FormControl type="file" required value={this.state.eventInfoLocal.prizeImg} name="prizeImg" onChange={this.handleChanges}/>
                                    </InputGroup>
                                </div>
                            </Form.Group>
                        </div>
                    
                    {/* <button className="btn btn-primary margender bold" onClick={addReward}> AÑADIR PREMIO{" "}<Plus></Plus></button> */}
                  </Form>
                  : ''}
                </fieldset>
            </div>
        )
    }
}


export default EventForm;
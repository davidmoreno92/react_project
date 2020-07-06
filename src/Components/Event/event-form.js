import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import Select from 'react-select'

import "react-datepicker/dist/react-datepicker.css";
import { Form, InputGroup, FormControl, Button, ButtonGroup, Table } from 'react-bootstrap';
import { Plus, Gift, Trash} from 'react-bootstrap-icons';
import './event-form.scss'
import EventService from "../../Services/event-service";
import GamesService from "../../Services/games-service";
import EventModel from '../../Models/Event';
import RewardModel from '../../Models/Reward';

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
            this.setState({ gamesOptions: games })
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
        eventInfoForm.titleEs = this.state.eventInfo.title.length ? this.state.eventInfo.title[0].name : '';
        eventInfoForm.titleEn = this.state.eventInfo.title.length ? this.state.eventInfo.title[1].name : '';
        eventInfoForm.rewards = this.state.eventInfo.rewards;
        eventInfoForm.rulesEs = this.state.eventInfo.rules ? this.state.eventInfo.rules[0] : '';
        eventInfoForm.rulesEn = this.state.eventInfo.rules ? this.state.eventInfo.rules[1] : '';
        eventInfoForm.type = this.state.eventInfo.type;

        this.setState({ eventInfoLocal: eventInfoForm })
    }

    handleChanges = e => {
        const { name, value } = e.target;
        const eventInfo = this.state.eventInfoLocal;
        eventInfo[name] = value;
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

    handleChangesRewards = (i, e) => {
        let newData = this.state.eventInfoLocal;
        const { name, value } = e.target;
        
        if (e.target.files && e.target.files.length) {
            newData.rewards[i]['fileObject'] = e.target.files[0];
            newData.rewards[i][name] = e.target.files[0].name;
        }
        else {
            newData.rewards[i][name] = value;
        }

        this.setState({eventInfoLocal: newData}); 
    }

    addReward = (e) => {
        e.preventDefault();
        let newData = this.state.eventInfoLocal;
        let rewardModel = { ...new RewardModel()};
        rewardModel.type = this.state.eventInfoLocal.prizeType ? this.state.eventInfoLocal.prizeType : 'R';
        newData.rewards.push(rewardModel);
        this.setState({eventInfoLocal: newData});
    }; 
    
    removeReward = (i, e) => {
        e.preventDefault();
        let newData = this.state.eventInfoLocal;
        newData.rewards.splice(i, 1);
        this.setState({eventInfoLocal: newData});
    };

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
                                    <Form.Label>Tipo de evento *</Form.Label>
                                    <InputGroup required className="pot-type-group">
                                        <Form.Check type="radio" checked={this.state.eventInfoLocal.potType === "S"} name="potType" value="S" onChange={this.handleChanges} /> Especie
                                    <Form.Check className="ml-3" checked={this.state.eventInfoLocal.potType === "R"} type="radio" name="potType" value="R" onChange={this.handleChanges} /> Dinero
                                </InputGroup>
                                </Form.Group>
                                {!this.state.eventInfo.gameId ?
                                    <Form.Group>
                                        <Form.Label>¿Para qué juegos quieres publicar el evento? *</Form.Label>
                                        {this.state.gamesOptions ?
                                            <InputGroup className="games-group">
                                                <Select required styles={selectStyles} className="w-100" isMulti placeholder="Selecciona uno o varios juegos" options={this.state.gamesOptions} name="gamesSelected" onChange={this.handleChangesAdd} />
                                            </InputGroup>
                                            : ''}
                                    </Form.Group>
                                    : ''}
                                <Form.Group>
                                    <Form.Label>Nombre del evento (ES / EN) *</Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl required value={this.state.eventInfoLocal.titleEs} name="titleEs" placeholder="Nombre del evento en Español" onChange={this.handleChanges} />
                                        <FormControl className="ml-3" required value={this.state.eventInfoLocal.titleEn} name="titleEn" placeholder="Event's name in English" onChange={this.handleChanges} />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Fecha inicio / Fecha fin *</Form.Label>
                                    <InputGroup className="mb-3">
                                        <DatePicker required styles={selectStyles} className="form-control" placeholderText="Click para seleccionar fecha" name="date" onChange={this.handleChangesDate.bind(this, "date")}
                                            value={moment(this.state.eventInfoLocal.date, 'x').toDate()} selected={moment(this.state.eventInfoLocal.date, 'x').toDate()} showTimeSelect locale="es" withPortallocale="es" timeFormat="HH:mm" timeIntervals={15}
                                            timeCaption="time" dateFormat="Pp" />

                                        <DatePicker required className="form-control ml-3" placeholderText="Click para seleccionar fecha" name="end" onChange={this.handleChangesDate.bind(this, "end")}
                                            value={moment(this.state.eventInfoLocal.end, 'x').toDate()} selected={moment(this.state.eventInfoLocal.end, 'x').toDate()} showTimeSelect locale="es" withPortallocale="es" timeFormat="HH:mm" timeIntervals={15}
                                            timeCaption="time" dateFormat="Pp" />
                                    </InputGroup>

                                    {this.state.eventInfoLocal.date > this.state.eventInfoLocal.end ?
                                        <p className="text-danger mt-2">La fecha de inicio no puede ser superior a la fecha de fin.</p> : ''}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Bote *</Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl required value={this.state.eventInfoLocal.potAmount} name="potAmount" onChange={this.handleChanges} />
                                    </InputGroup>
                                    {!!(this.state.eventInfoLocal.minFees) && !!(this.state.eventInfoLocal.feeAmount) ?
                                        <p className="text-danger mt-2">Bote mínimo: {this.state.eventInfoLocal.minFees * this.state.eventInfoLocal.feeAmount}</p>
                                        : ''}
                                </Form.Group>
                            </div>
                            <div className="right w-50 pl-4 float-left">
                                <Form.Group>
                                    <Form.Label>Tipo de entrada *</Form.Label>
                                    <InputGroup required className="pot-type-group">
                                        <Form.Check type="radio" checked={this.state.eventInfoLocal.feeType === "R"} name="feeType" value="R" onChange={this.handleChanges}/> Dinero
                                        <Form.Check className="ml-3" checked={this.state.eventInfoLocal.feeType === "F"} type="radio" name="feeType" value="F" onChange={this.handleChanges}/> GG
                                        <Form.Check className="ml-3" checked={this.state.eventInfoLocal.feeType === "F" && this.state.eventInfoLocal.feeAmount === 0} type="radio" name="feeType" value="free" onChange={this.handleChanges}/> Gratuito
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Nº de entradas mínimo *</Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl type="number" required value={this.state.eventInfoLocal.minFees} name="minFees" onChange={this.handleChanges} />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Entrada *</Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl disabled={this.state.eventInfoLocal.feeType === 'free'} type="number" required value={this.state.eventInfoLocal.feeAmount} name="feeAmount" onChange={this.handleChanges} />
                                        <InputGroup.Append>
                                            <InputGroup.Text>
                                                {this.state.eventInfoLocal.feeType === 'R' ?
                                                    <span>€</span> : <span>GG</span>}
                                            </InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Reparto de premios *</Form.Label>
                                    <Form.Group>
                                        <Form.Label>Tipo de premios</Form.Label>
                                        <p className="text-muted">
                                            (Para añadir un premio de otro tipo, cambia el tipo y añade un nuevo premio)
                                        </p>
                                        <InputGroup required className="pot-type-group" onChange={this.handleChanges}>
                                            <Form.Check type="radio" name="prizeType" value="R" /> Dinero
                                            <Form.Check className="ml-3" type="radio" name="prizeType" value="F" /> GG
                                            <Form.Check className="ml-3" type="radio" name="prizeType" value="S" /> Especie
                                    </InputGroup>
                                    </Form.Group>
                                    { this.state.eventInfoLocal.rewards ?
                                        this.state.eventInfoLocal.rewards.map( (event, i) => {
                                        return (
                                        <Form.Group key={i} className="prize-box">
                                            <InputGroup className="mb-3">
                                                <Form.Label className="w-100">Posición</Form.Label>
                                                <FormControl type="number" required value={this.state.eventInfoLocal.rewards[i].position} name="position" onChange={this.handleChangesRewards.bind(this, i)} />
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                                <Form.Label className="w-100">Premio</Form.Label>
                                                <FormControl type={this.state.eventInfoLocal.rewards[i].type === 'S' ? 'text' : 'number'} required value={this.state.eventInfoLocal.rewards[i].amount} name="amount"  onChange={this.handleChangesRewards.bind(this, i)}/>
                                                <InputGroup.Append>
                                                    <InputGroup.Text>
                                                        {this.state.eventInfoLocal.rewards[i].type === 'R' ?
                                                            <span>€</span> : this.state.eventInfoLocal.rewards[i].type === 'F' ? <span>GG</span> : <span><Gift></Gift></span>}
                                                    </InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                                <Form.Label className="w-100">Imagen</Form.Label>
                                                <FormControl id="rewardImg" hidden accept="image/*" type="file" placerholder="Subir imagen" required name="imgUrl" onChange={this.handleChangesRewards.bind(this, i)}/>
                                                <label className="uploadLabel" htmlFor="rewardImg">
                                                    {this.state.eventInfoLocal.rewards[i].imgUrl ? this.state.eventInfoLocal.rewards[i].imgUrl : <span>Examinar</span>}
                                                </label>
                                            </InputGroup>
                                            <span className="delete-button pl-3">
                                                <Trash size={25} onClick={this.removeReward.bind(this, i)} />
                                            </span>
                                        </Form.Group>
                                        )
                                    }): ''
                                    }
                                    <button className="btn btn-primary margender bold" onClick={this.addReward}> AÑADIR PREMIO <Plus size="28"></Plus></button>
                                </Form.Group>
                            </div>
                        </Form>
                        : ''}
                </fieldset>
            </div>
        )
    }
}


export default EventForm;
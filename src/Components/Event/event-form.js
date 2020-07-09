import React from 'react';
import moment from 'moment';
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import Select from 'react-select'
import { Redirect } from 'react-router-dom'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Gift, X, PlusSquareFill } from 'react-bootstrap-icons';

import "react-datepicker/dist/react-datepicker.css";
import './event-form.scss'
import EventsService, { IMAGES_TOURS_BUCKET } from "../../Services/event-service";
import GamesService from "../../Services/games-service";
import EventModel from '../../Models/Event';
import RewardModel from '../../Models/Reward';

class EventForm extends React.Component {
    constructor(props) {
        super(props);
        let eventModel = new EventModel();
        this.form = React.createRef();
        this.state = {
            eventInfo: this.props.eventInfo ? this.props.eventInfo : eventModel,
            gamesOptions: [],
            gamesSelected: [],
            error: false
        };
        registerLocale("es", es);
    }

    async componentDidMount() {
        await (GamesService.getGames()).then((data) => {
            let games = data.map((i) => ({ label: i.name, value: i.id }));
            this.setState({ gamesOptions: games })
        });

        let eventInfoForm = {};
        eventInfoForm.id = this.state.eventInfo.id;
        eventInfoForm.date = this.state.eventInfo.date;
        eventInfoForm.created = this.state.eventInfo.created;
        eventInfoForm.title = this.state.eventInfo.title;
        eventInfoForm.updated = this.state.eventInfo.updated;
        eventInfoForm.start = this.state.eventInfo.start;
        eventInfoForm.end = this.state.eventInfo.end;
        eventInfoForm.token = this.state.eventInfo.token;
        eventInfoForm.gameId = this.state.eventInfo.gameId;

        eventInfoForm.dateShowable = this.state.eventInfo.dateShowable ? this.state.eventInfo.dateShowable : eventInfoForm.start;
        eventInfoForm.subType = this.state.eventInfo.subType ? this.state.eventInfo.subType : new EventModel().subType;
        eventInfoForm.topicId = this.state.eventInfo.topicId ? this.state.eventInfo.topicId : new EventModel().topicId;
        eventInfoForm.code = this.state.eventInfo.code ? this.state.eventInfo.code : new EventModel().code;
        eventInfoForm.minFees = this.state.eventInfo.minFees ? this.state.eventInfo.minFees : 0;
        eventInfoForm.maxPlayers = this.state.eventInfo.maxPlayers ? this.state.eventInfo.maxPlayers : 0;
        eventInfoForm.rewards = this.state.eventInfo.rewards ? this.state.eventInfo.rewards : new EventModel().rewards;
        eventInfoForm.fee = this.state.eventInfo.fee ? this.state.eventInfo.fee : new EventModel().fee;
        eventInfoForm.fee.amount = this.state.eventInfo.fee.amount ? this.state.eventInfo.fee.amount : 0;
        eventInfoForm.pot = this.state.eventInfo.pot ? this.state.eventInfo.pot : new EventModel().pot;
        eventInfoForm.pot.amount = this.state.eventInfo.pot.amount ? this.state.eventInfo.pot.amount : 0;

        eventInfoForm.files = new EventModel().files;
        eventInfoForm.files.bannerImage.url = this.state.eventInfo.imgUrl;
        eventInfoForm.files.potImage.url = this.state.eventInfo.pot.imgUrl;
        eventInfoForm.files.rewardImage.url = this.state.eventInfo.rewards.imgUrl;
        
        eventInfoForm.isNew = this.state.eventInfo.isNew ? this.state.eventInfo.isNew : false;

        this.setState({ eventInfoLocal: eventInfoForm });
    }

    handleChanges = (param, e) => {
        const { name, value } = e.target;
        const eventInfo = this.state.eventInfoLocal;
        if (name === 'title') {
            let languageData = eventInfo.title.findIndex(obj => obj.lang === param);
            eventInfo[name][languageData].name = value;
        } else if (name === 'pot' || name === 'fee') {
            eventInfo[name][param] = value;
        } else {
            eventInfo[name] = value;
        }
        this.setState({ eventInfo: eventInfo });
    };

    handleImagesGlobal = e => {
        let newData = this.state.eventInfoLocal;
        const { name } = e.target;

        if (e.target.files && e.target.files.length) {
            newData.files[name].url= e.target.files[0].name;
            newData.files[name].dataObject = e.target.files[0];

            console.log(newData.files[name]);
        }

        console.log(newData);
        this.setState({ eventInfoLocal: newData });
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
        e.preventDefault();
        let newData = this.state.eventInfoLocal;
        const { name, value } = e.target;

        if (e.target.files && e.target.files.length) {
            newData.rewards[i]['dataObject'] = e.target.files[0];
            newData.rewards[i]['imgUrl'] = e.target.files[0].name;
        }
        else {
            newData.rewards[i][name] = value;
        }

        this.setState({ eventInfoLocal: newData });
    }

    addReward = (e) => {
        e.preventDefault();
        let newData = this.state.eventInfoLocal;
        let rewardModel = { ...new RewardModel() };
        rewardModel.type = this.state.eventInfoLocal.prizeType ? this.state.eventInfoLocal.prizeType : 'R';
        newData.rewards.push(rewardModel);
        this.setState({ eventInfoLocal: newData });
    };

    removeReward = (i, e) => {
        e.preventDefault();
        let newData = this.state.eventInfoLocal;
        newData.rewards.splice(i, 1);
        this.setState({ eventInfoLocal: newData });
    };
    
    createEvent = (e) => {
        console.log(this.state.eventInfoLocal);
        try {
            this.form.current.reportValidity();
            this.state.gamesSelected.forEach(async game => {
                let gameId = game.value;
                let eventToAdd = { ...this.state.eventInfoLocal };
                EventsService.createEvent(eventToAdd, gameId)
                    .then((response) => {
                        this.setState({ createResponse: response.data, createSubmitted: true });
                    })
                    .catch((e) => {
                        this.setState({ createResponse: e, createSubmitted: true });
                        console.log(e);
                    });

            });
        } catch (err) {
            this.setState({ error: err });
        }
    }

    render() {
        const selectStyles = { menu: styles => ({ ...styles, zIndex: 999 }) };
        return (
            <div className="px-lg-5 py-3">
                {this.state.error ?
                    <div class="alert alert-danger" role="alert">
                        Se ha producido un la creación del evento.
                    </div>
                    : 
                this.state.createSubmitted ?
                    <div class="alert alert-success col-12" role="alert">
                        Evento creado correctamente!
                    </div>
                    : undefined
                }
                <fieldset disabled={!this.props.isEditable || this.state.createSubmitted}>
                    {this.state.eventInfoLocal ?
                        <Form ref={this.form}>
                            <div className="left col-12 col-lg-6 pr-4 float-left">
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
                                <div className="row">
                                    <Form.Group className="col-12 col-lg-6">
                                        <Form.Label>Nombre del evento (ES)</Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl required value={this.state.eventInfoLocal.title ? this.state.eventInfoLocal.title[1].name : ''} name="title" placeholder="Nombre del evento en Español" onChange={this.handleChanges.bind(this, 'es')} />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="col-12 col-lg-6">
                                        <Form.Label>Nombre del evento (EN)</Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl required value={this.state.eventInfoLocal.title ? this.state.eventInfoLocal.title[0].name : ''} name="title" placeholder="Event's name in English" onChange={this.handleChanges.bind(this, 'en')} />
                                        </InputGroup>
                                    </Form.Group>
                                </div>
                                <div className="row">
                                    {!(this.state.eventInfoLocal.dateShowable <= this.state.eventInfoLocal.start) ?
                                        <div className="text-danger col-12">
                                            La fecha de visualización debe ser igual o inferior a la fecha de inicio.
                                        </div>
                                        : undefined}
                                    <Form.Group className="col-12 col-lg-4">
                                        <Form.Label>Fecha inicio *</Form.Label>
                                        <InputGroup className="mb-3">
                                            <DatePicker className="col-4 col-lg-12" required styles={selectStyles} className="form-control" name="start" onChange={this.handleChangesDate.bind(this, "start")}
                                                value={moment(this.state.eventInfoLocal.start, 'x').toDate()} selected={moment(this.state.eventInfoLocal.start, 'x').toDate()} showTimeSelect locale="es" withPortallocale="es" timeFormat="HH:mm" timeIntervals={15}
                                                timeCaption="time" dateFormat="Pp" />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="col-12 col-lg-4">
                                        <Form.Label>Fecha fin *</Form.Label>
                                        <InputGroup className="mb-3">
                                            <DatePicker className="col-4 col-lg-12" required className="form-control" name="end" onChange={this.handleChangesDate.bind(this, "end")}
                                                value={moment(this.state.eventInfoLocal.end, 'x').toDate()} selected={moment(this.state.eventInfoLocal.end, 'x').toDate()} showTimeSelect locale="es" withPortallocale="es" timeFormat="HH:mm" timeIntervals={15}
                                                timeCaption="time" dateFormat="Pp" />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="col-12 col-lg-4">
                                        <Form.Label>Fecha visualización </Form.Label>
                                        <InputGroup className="mb-3">
                                            <DatePicker className="col-4 col-lg-12" required styles={selectStyles} className="form-control" name="dateShowable" onChange={this.handleChangesDate.bind(this, "dateShowable")}
                                                value={moment(this.state.eventInfoLocal.dateShowable, 'x').toDate() || null} selected={moment(this.state.eventInfoLocal.dateShowable, 'x').toDate() || null} showTimeSelect locale="es" withPortallocale="es" timeFormat="HH:mm" timeIntervals={15}
                                                timeCaption="time" dateFormat="Pp" />
                                        </InputGroup>
                                    </Form.Group>
                                </div>
                                <div className="row">
                                    <Form.Group className="col-12 col-lg-4">
                                        <Form.Label>Bote *</Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl type="number" required value={this.state.eventInfoLocal.pot.amount} name="pot" onChange={this.handleChanges.bind(this, 'amount')} />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group>
                                    </Form.Group>
                                    <Form.Group className="col-12 col-lg-4">
                                        <Form.Label>Topic ID</Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl value={this.state.eventInfoLocal.topicId} placerholder="Introduce el topic ID" name="topicId" onChange={this.handleChanges.bind(this, null)} />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="col-12 col-lg-4">
                                        <Form.Label>Código de evento</Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl value={this.state.eventInfoLocal.code} placerholder="Introduce el código del evento" name="code" onChange={this.handleChanges.bind(this, null)} />
                                            <Button className="ml-1">Validar</Button>
                                        </InputGroup>
                                    </Form.Group>
                                </div>
                                <Form.Group>
                                    <Form.Label>Imágenes asociadas *</Form.Label>
                                </Form.Group>
                                <div className="row images-box">
                                    <Form.Group className="col-12 col-lg-6">
                                        <Form.Label>Reward</Form.Label>
                                        <InputGroup className="mb-3 images-border">
                                            <div className="col-12 p-2">
                                                {this.state.eventInfoLocal.files && this.state.eventInfoLocal.files.rewardImage && this.state.eventInfoLocal.files.rewardImage.url ?
                                                    <img className="pb-2 mw-100" src={URL.createObjectURL(this.state.eventInfoLocal.files.rewardImage.dataObject)} alt="reward"></img>
                                                    : this.state.eventInfoLocal.reward && this.state.eventInfoLocal.reward.imgUrl ?
                                                        <img className="pb-2 mw-100" src={IMAGES_TOURS_BUCKET + '/' + this.state.eventInfoLocal.reward.imgUrl} alt="reward" />
                                                        : undefined
                                                }
                                                <FormControl id="rewardGlobalImg" accept="image/jpg, image/jpeg, image/png" type="file" name="rewardImage" onChange={this.handleImagesGlobal} />
                                                {this.state.eventInfoLocal.files && this.state.eventInfoLocal.files.rewardImage && this.state.eventInfoLocal.files.rewardImage.url ?
                                                    <span className="uploadLabel">{this.state.eventInfoLocal.files.rewardImage.url}</span>
                                                : undefined }
                                            </div>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="col-12 col-lg-6">
                                        <Form.Label className="pl-lg-2">Pot</Form.Label>
                                        <InputGroup className="images-border">
                                            <div className="p-2">
                                                {this.state.eventInfoLocal.files && this.state.eventInfoLocal.files.potImage && this.state.eventInfoLocal.files.potImage.url ?
                                                    <img className="pb-2 mw-100" src={URL.createObjectURL(this.state.eventInfoLocal.files.potImage.dataObject)} alt="pot"></img>
                                                    : this.state.eventInfoLocal.pot && this.state.eventInfoLocal.pot.imgUrl ?
                                                        //Route to s3 in SRC
                                                        <img className="pb-2 mw-100" src={IMAGES_TOURS_BUCKET + '/' + this.state.eventInfoLocal.pot.imgUrl} alt="pot" />
                                                        : undefined
                                                }
                                                <FormControl id="rewardPotImg" accept="image/jpg, image/jpeg, image/png" type="file" name="potImage" onChange={this.handleImagesGlobal} />
                                                {this.state.eventInfoLocal.files && this.state.eventInfoLocal.files.potImage && this.state.eventInfoLocal.files.potImage.url ?
                                                    <span className="uploadLabel">{this.state.eventInfoLocal.files.potImage.url}</span>
                                                : undefined }
                                            </div>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="col-12">
                                        <Form.Label>Banner</Form.Label>
                                        <InputGroup className="images-border">
                                            <div className="p-2">
                                                {this.state.eventInfoLocal.files && this.state.eventInfoLocal.files.bannerImage && this.state.eventInfoLocal.files.bannerImage.url ?
                                                    <img className="pb-2 mw-100" src={URL.createObjectURL(this.state.eventInfoLocal.files.bannerImage.dataObject)} alt="banner"></img>
                                                    : this.state.eventInfoLocal.imgUrl ?
                                                        <img className="pb-2 mw-100" src={IMAGES_TOURS_BUCKET + '/' + this.state.eventInfoLocal.imgUrl} alt="banner" />
                                                        : undefined
                                                }
                                                <FormControl id="rewardBannerImg" accept="image/jpg, image/jpeg, image/png" type="file" name="bannerImage" onChange={this.handleImagesGlobal} />
                                                {this.state.eventInfoLocal.files && this.state.eventInfoLocal.files.bannerImage && this.state.eventInfoLocal.files.bannerImage.url ?
                                                    <span className="uploadLabel">{this.state.eventInfoLocal.files.bannerImage.url}</span>
                                                : undefined }
                                            </div>
                                        </InputGroup>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="right col-12 col-lg-6 pl-4 float-left">
                                <Form.Group>
                                    <Form.Label>Tipo de entrada *</Form.Label>
                                    <InputGroup required className="pot-type-group">
                                        <Form.Check type="radio" checked={this.state.eventInfoLocal.fee.type === "R"} name="fee" value="R" onChange={this.handleChanges.bind(this, 'type')} /> Dinero
                                        <Form.Check className="ml-3" checked={this.state.eventInfoLocal.fee.type === "F"} type="radio" name="fee" value="F" onChange={this.handleChanges.bind(this, 'type')} /> GG
                                        <Form.Check className="ml-3" checked={this.state.eventInfoLocal.fee.type === "free"} type="radio" name="fee" value="free" onChange={this.handleChanges.bind(this, 'type')} /> Gratuito
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Nº de entradas mínimo *</Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl type="number" required value={this.state.eventInfoLocal.minFees} name="minFees" onChange={this.handleChanges.bind(this, undefined)} />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Nº de entradas máximo *</Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl type="number" value={this.state.eventInfoLocal.maxPlayers} name="maxPlayers" onChange={this.handleChanges.bind(this, undefined)} />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Entrada *</Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl disabled={this.state.eventInfoLocal.fee.type === 'free'} type="number" required value={this.state.eventInfoLocal.fee.amount} name="fee" onChange={this.handleChanges.bind(this, 'amount')} />
                                        <InputGroup.Append>
                                            <InputGroup.Text>
                                                {this.state.eventInfoLocal.fee.type === 'R' ?
                                                    <span>€</span> : <span>GG</span>}
                                            </InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Reparto de premios *</Form.Label>
                                    <Form.Group className="prizes-header">
                                        <Form.Label>Añadir un premio</Form.Label>
                                        <p className="text-muted">
                                            Para añadir un nuevo premio, selecciona el tipo y da clic en +
                                        </p>
                                        <InputGroup required className="pot-type-group" onChange={this.handleChanges.bind(this, undefined)}>
                                            <Form.Check defaultChecked type="radio" name="prizeType" value="R" /> Dinero
                                            <Form.Check className="ml-3" type="radio" name="prizeType" value="F" /> GG
                                            <Form.Check className="ml-3" type="radio" name="prizeType" value="S" /> Especie
                                            <PlusSquareFill className="text-success ml-auto" size={32} onClick={this.addReward}></PlusSquareFill>
                                        </InputGroup>
                                    </Form.Group>
                                    {this.state.eventInfoLocal.rewards && this.state.eventInfoLocal.rewards.length ?
                                        this.state.eventInfoLocal.rewards.map((event, i) => {
                                            return (
                                                <Form.Group key={i} className="prize-box">
                                                    <InputGroup className="mb-3">
                                                        <Form.Label className="w-100">Posición</Form.Label>
                                                        <FormControl type="number" required value={this.state.eventInfoLocal.rewards[i].position} name="position" onChange={this.handleChangesRewards.bind(this, i)} />
                                                    </InputGroup>
                                                    <InputGroup className="mb-3">
                                                        <Form.Label className="w-100">Premio</Form.Label>
                                                        <FormControl type={this.state.eventInfoLocal.rewards[i].type === 'S' ? 'text' : 'number'} required value={this.state.eventInfoLocal.rewards[i].amount} name="amount" onChange={this.handleChangesRewards.bind(this, i)} />
                                                        <InputGroup.Append>
                                                            <InputGroup.Text className="reward-currency">
                                                                {this.state.eventInfoLocal.rewards[i].type === 'R' ?
                                                                    <span>€</span> : this.state.eventInfoLocal.rewards[i].type === 'F' ? <span>GG</span> : <span><Gift></Gift></span>}
                                                            </InputGroup.Text>
                                                        </InputGroup.Append>
                                                    </InputGroup>
                                                    <InputGroup className="mb-3">
                                                        <Form.Label className="w-100">Imagen</Form.Label>
                                                        <FormControl id="rewardImg" accept="image/jpg, image/jpeg, image/png" type="file" placerholder="Subir imagen" name="imgUrl" onChange={this.handleChangesRewards.bind(this, i)} />
                                                        <span className="uploadLabel">{this.state.eventInfoLocal.rewards[i].imgUrl ? this.state.eventInfoLocal.rewards[i].imgUrl : ''}</span>
                                                    </InputGroup>
                                                    <span className="delete-button pl-3">
                                                        <X size={25} onClick={this.removeReward.bind(this, i)} />
                                                    </span>
                                                </Form.Group>
                                            )
                                        }) : ''
                                    }
                                </Form.Group>

                            </div>
                            {this.props.isEditable && !this.state.eventInfoLocal.isNew ?
                                <button className="btn btn-info" type='button' onClick={(e) => this.updateEvent(e)}> Editar evento </button>
                                : this.state.eventInfoLocal.isNew ?
                                    <button className="btn btn-primary" type='button' onClick={(e) => this.createEvent(e)}> Crear evento</button>
                                    : ''
                            }
                        </Form>
                        : ''}
                </fieldset>
            </div>
        )
    }
}


export default EventForm;
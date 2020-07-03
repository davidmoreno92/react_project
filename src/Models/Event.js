import { v4 as uuid } from 'uuid';
import randomstring from 'randomstring';

class EventModel {
    constructor(id, created, updated, state, date, token, potType, gameId, potImg, subType, topicId, backgroundImage, imgUrl, start, end, fee, pot, minFees, title, code, rules, type, tz, url) {
      this._curPlayers = 0;
      this._guaranty = 0;
      this._priv = false;
      this._live = true; 
      this._logo = 2;
      this._tz = 'Europe/Madrid';
      this._url = 'https://www.egogames.com/games.html'

      this.state = state ? state : 'C';  //'C' Created, 'E' Ended  TO ADD: 'H'
      this.date = date ? date : Date.now();
      this.token = token ? token : randomstring.generate();
      this.created = created ? created : Date.now();
      this.updated = updated ? updated : Date.now();
      this.id = id ? id : uuid();
      this.potType = potType;
      this.gameId = gameId;
      this.potImg = potImg;
      this.subType = subType;
      this.topicId = topicId;
      this.backgroundImage = backgroundImage;
      this.imgUrl = imgUrl;
      this.start = start;
      this.end = end ? end : Date.now();
      this.fee = fee;
      this.pot = pot;
      this.minFees = minFees;
      this.title = title ? title : [];
      this.rewards = [];
      this.code = code;
      this.rules = rules;
      this.type = type;
      this.tz = tz;
      this.url = url;
      this.isNew = true;
    }
  }

export default EventModel;
import { v4 as uuid } from 'uuid';
import randomstring from 'randomstring';

class EventModel {
    constructor(potType, gameId, potImg, subType, topicId, backgroundImage, imgUrl, start, end, fee, pot, minFees, title, code, rules, state, type, tz, url) {
      this._id = uuid();
      this._created = Date.now();
      this._updated = Date.now();
      this._date = this._created = this._updated = Date.now();
      this._curPlayers = 0;
      this._token = randomstring.generate();
      this._guaranty = 0;
      this._priv = false;
      this._live = true; 
      this._logo = 2;
      this._tz = 'Europe/Madrid';
      this._url = 'https://www.egogames.com/games.html'

      this.potType = potType;
      this.gameId = gameId;
      this.potImg = potImg;
      this.subType = subType;
      this.topicId = topicId;
      this.backgroundImage = backgroundImage;
      this.imgUrl = imgUrl;
      this.start = start;
      this.end = end;
      this.fee = fee;
      this.pot = pot;
      this.minFees = minFees;
      this.title = title;
      this.rewards = [];
      this.code = code;
      this.rules = rules;
      this.state = state;
      this.type = type;
      this.tz = tz;
      this.url = url;
    }
  }

export default EventModel;
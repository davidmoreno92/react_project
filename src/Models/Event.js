import { v4 as uuid } from 'uuid';
import randomstring from 'randomstring';

class EventModel {
  constructor() {
    this.curPlayers = 0;
    this.guaranty = 0;
    this.priv = false;
    this.live = true;
    this.logo = 2;
    this.tz = 'Europe/Madrid';
    this.url = 'https://www.egogames.com/games.html'

    this.state = 'C';  //'C' Created, 'E' Ended  TO ADD: 'H'
    this.date = Date.now();
    this.token = randomstring.generate();
    this.created = Date.now();
    this.updated = Date.now();
    this.start = Date.now();
    this.end = Date.now();
    this.dateShowable = this.start;
    this.id = uuid();
    this.gameId = '';
    this.subType = '';
    this.topicId = '';
/*  this.files = {};
    this.imgUrl = '';
    this.potImg = '';
    this.bannerImg = ''; */
    this.files = {};
    this.files.bannerImage = { base64: '', url: '', dataObject: {}};
    this.files.potImage = { base64: '', url: '', dataObject: {}};
    this.files.rewardImage ={ base64: '', url: '', dataObject: {}};
    this.fee = { amount: 0 };
    this.pot = { amount: 0 };
    this.minFees = '';
    this.maxPlayers = '';
    this.title =  [];
    this.title[0] = { lang: 'en', name: '' };
    this.title[1] = { lang: 'es', name: '' };
    this.rewards = [];
    this.code = '';
    this.rules = [];
    this.type = '';
    this.isNew = true;
  }
}

export default EventModel;
import AuthService from './auth-service'
import { API } from 'aws-amplify';
import GamesService from './games-service';
import ImageToBase64 from "../Tools/image-to-base-64";

//PROD export const IMAGES_BUCKET = 'https://s3-eu-west-1.amazonaws.com/tourns';
export const IMAGES_TOURS_BUCKET = 'https://egogames-server-repo.s3-eu-west-1.amazonaws.com/tourns';
class EventsService {
  constructor() {
    this.gameService = GamesService;
    this.state = { games: [], events: [] };
    this.apiName = 'adminAPI';
    this.endPoint = '/events';
    this.createEndPoint = '/tourns/create';
  }

  getParams = async () => {
    return {
      response: true,
      headers: {
        Authorization: await AuthService.getAuthorizationToken(),
        'Content-Type': 'multipart/form-data'
      },
      body: {}
    };
  }

  getEventsByGame = async (gameId, limit) => {
    return API.get(this.apiName, `${this.endPoint}?q=${gameId}&l=${limit}`)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error.response);
        return error;
      });
  }

  createEvent = async (event, gameId) => {
    let eventToAdd = event;
    if (eventToAdd) {
      eventToAdd.gameId = gameId;
      eventToAdd.start = parseInt(eventToAdd.start);
      eventToAdd.end = parseInt(eventToAdd.end);
      eventToAdd.dateShowable = parseInt(eventToAdd.dateShowable);
      eventToAdd.minFees = parseInt(eventToAdd.minFees);
      eventToAdd.maxPlayers = parseInt(eventToAdd.maxPlayers);
      eventToAdd.fee.amount = eventToAdd.fee.type !== 'free' ? parseInt(eventToAdd.fee.amount) : 0;
      eventToAdd.pot.amount = parseInt(eventToAdd.pot.amount);
      eventToAdd.pot.type = 'R'; //R is the only one used
      eventToAdd.pot.currency = eventToAdd.pot.type === 'R' ? 'EUR' : 'GG';
      eventToAdd.fee.currency = (eventToAdd.fee.type === 'R') || (eventToAdd.fee.type === 'R' && eventToAdd.fee.amount === 0) ? 'EUR' : 'GG'
      eventToAdd.rewards.forEach( async reward => {
        parseInt(reward.amount);
        parseInt(reward.position);
        reward.currency = reward.type === 'R' ? 'EUR' : 'GG'
        if (reward.dataObject) {
          reward.rewardImage = { base64: await ImageToBase64.transform(reward.dataObject), url: reward.imgUrl };
        }
      });

      eventToAdd.files.potImage.base64 = eventToAdd.files.potImage.dataObject.name ? await ImageToBase64.transform(eventToAdd.files.potImage.dataObject) : null;
      eventToAdd.files.bannerImage.base64 = eventToAdd.files.bannerImage.dataObject.name ? await ImageToBase64.transform(eventToAdd.files.bannerImage.dataObject) : null;
      eventToAdd.files.rewardImage.base64 = eventToAdd.files.rewardImage.dataObject.name ? await ImageToBase64.transform(eventToAdd.files.rewardImage.dataObject) : null;

      let params = await this.getParams();
      params.body = eventToAdd;

      return API.post(this.apiName, this.createEndPoint, params)
        .then(response => {
          return response;
        })
        .catch(error => {
          return error;
        });
    }
  }

  updateEvent = async (event) => {

  }
}

export default new EventsService();
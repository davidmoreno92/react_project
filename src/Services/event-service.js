import AuthService from './auth-service'
import { API } from 'aws-amplify';
import GamesService from './games-service';

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

  createEvent = async (event) => {
    let params = await this.getParams();
    params.body = event;

    return API.post(this.apiName, this.createEndPoint, params)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error.response);
        return error;
      });
  }

  updateEvent = async (event) => {
/*     return API.put(this.apiName, this.endPoint, event)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error.response);
        return error;
      }); */
  }
}

export default new EventsService();
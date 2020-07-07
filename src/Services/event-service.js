import React from 'react';
import AuthService from './auth-service'
import { API } from 'aws-amplify';
import GamesService from './games-service';

class EventsService extends React.Component {

  constructor(props) {
    super(props);
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
        Authorization: await AuthService.getAuthorizationToken()
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
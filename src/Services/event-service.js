import React from 'react';
import AuthService from './auth-service'
import { API } from 'aws-amplify';
import GamesService from './games-service';

class EventService extends React.Component {

  constructor(props) {
    super(props);
    this.gameService = GamesService;
    this.state = { games: [], events: [] };
    this.apiName = 'adminAPI';
    this.endPoint = '/events';
  }

  getParams = async (gameId, limit) => {
    return {
      response: true,
      headers: {
        Authorization: await AuthService.getAuthorizationToken()
      },
      queryStringParameters: {
        q: gameId,
        l: limit
      }
    };
  }

  getEventsByGame = async(gameId, limit) => {
    return API.get(this.apiName, `${this.endPoint}?q=${gameId}&l=${limit}`)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error.response);
        return {}
      });
  }

  /* MOCK DATA
  getEventsByGame = async (gameId) => {
    return {
      events:
        [
          { name: 'Nombre del evento 1', date_start: '1593403200000', date_finish: '1593519462610', status: 'Activo' },
          { name: 'Nombre del evento 3', date_start: '1593403200000', date_finish: '1593519462610', status: 'Publicado' },
          { name: 'Nombre del evento 4', date_start: '1593519462610', date_finish: '1593519462610', status: 'Finalizado' }
        ]
    }
  }*/

  setEvent = (event) => {

  }

  /*
  const apiName = this.apiName;
  const endPoint = this.endPoint;
  let queryParams = await this.getParams();
  let games = await (await this.gameService.getGames()).json;
  
  await (this.gameService.getGames()).then( games => {
    if (games) {
      games.map(function (game) {
        API.get(apiName, endPoint+'?q=68c839e8-b4f1-457b-99ab-2ae9d0199735')
          .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error.response);
          return {}
        });
      });
    }
  });
  */
}

export default new EventService();
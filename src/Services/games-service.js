import React from 'react';
import AuthService from './auth-service'
import { API } from 'aws-amplify';

class GamesService {
  apiName = 'adminAPI';
  endPoint = '/games';
  
  getParams = async() => {
    return {
      response: true,
      headers: {
        Authorization: await AuthService.getAuthorizationToken(),
      }
    };
  }

  getGames = async() => {
    let queryParams = await this.getParams();
    return API.get(this.apiName, `${this.endPoint}/list`)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error.response);
        return {}
      });
  }

}

export default new GamesService();
import { Auth } from 'aws-amplify';

class AuthService {

  getAuthorizationToken = async() => {
    return `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`;
  }

  getUserName = async() => {
    return (await Auth.currentUserInfo());
  }
  
}

export default new AuthService();
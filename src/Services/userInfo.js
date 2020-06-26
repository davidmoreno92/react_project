import { Auth } from 'aws-amplify';

export async function getUserInfo() {
    return await Auth.currentSession();
}
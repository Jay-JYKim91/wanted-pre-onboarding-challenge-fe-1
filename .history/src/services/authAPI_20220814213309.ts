import axios from 'axios';
import { AuthData } from '../page/Auth';

export async function logIn(data: AuthData) {
  const response = await axios.post('http://localhost:8080/users/login', data, {
      headers: {
        "Content-Type": "application/json"
      }
    })

  return response.data;
}

export async function signUp(data: AuthData) {
  const response = await axios.post('http://localhost:8080/users/create', data, {
      headers: {
        "Content-Type": "application/json"
      }
    })

  return response.data;
}

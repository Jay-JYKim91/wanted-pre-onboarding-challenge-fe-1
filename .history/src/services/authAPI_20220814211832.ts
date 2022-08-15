import axios from 'axios';
import { AuthData } from '../page/Auth';

export async function LogIn(data: AuthData) {
  const response = await axios.post('http://localhost:8080/users/login', data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
  console.log(response.data)
  return response.data;
  // const response =  await fetch("http://localhost:8080/users/login", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // })
  // const result = await response.json();
  // return result;

}

export async function signUp(data: AuthData) {
  const response = await fetch("http://localhost:8080/users/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  const result = await response.json();
  return result;
}

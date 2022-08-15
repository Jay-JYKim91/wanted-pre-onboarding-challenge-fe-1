import axios from 'axios';
import { useQuery } from 'react-query';
import { AuthData } from '../page/Auth';

export function LogIn(data: AuthData) {
  const response = useQuery(['logIn'], () => 
    axios.post('http://localhost:8080/users/login', data)
  )
  console.log(response)
  return response;
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

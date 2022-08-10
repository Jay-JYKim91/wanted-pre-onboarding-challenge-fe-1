import { AuthData } from '../page/Auth';

export async function logIn(data: AuthData) {
  const response =  await fetch("http://localhost:8080/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  const result = await response.json();
  return result;
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

import { TodoData } from '../component/AddForm';

export async function getTodos(userToken: string) {
  const response = await fetch("http://localhost:8080/todos", {
    method: "GET",
    headers: { Authorization: userToken },
  })
  const result = await response.json();
  return result;
}

export async function getTodoById(id: string, userToken: string) {
  const response = await fetch(`http://localhost:8080/todos/${id}`, {
    method: "GET",
    headers: { Authorization: userToken },
  })
  const result = await response.json();
  return result;
}

export async function createTodo(data: TodoData, userToken: string) {
  const response = await fetch("http://localhost:8080/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: userToken!,
    },
    body: JSON.stringify(data),
  })
  const result = await response.json();
  return result;
}

export async function deleteTodo(id: string, userToken: string) {
  const response = await fetch(`http://localhost:8080/todos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: userToken!,
    },
  })
  const result = await response.json();
  return result;
}

export async function updateTodo(id: string, userToken: string,  data: {title: string, content: string}) {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken!,
      },
      body: JSON.stringify(data),
    })
    const result = await response.json();
    return result;
  }
export async function getTodos(userToken: string) {
  const response = fetch("http://localhost:8080/todos", {
    method: "GET",
    headers: { Authorization: userToken },
  })
}
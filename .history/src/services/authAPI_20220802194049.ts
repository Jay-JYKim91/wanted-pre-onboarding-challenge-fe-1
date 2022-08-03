export async function logIn(data: {email: string, password: string}) {
    const response =  await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    const result = await response.json();
    return result;
}

export async function signUp(data) {
    const response = await fetch("http://localhost:8080/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await response.json();
      return result;
    
}
export function logIn(data: {email: string, password: string}) {
    fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((res) => {
            return res
        })
}

export function signUp() {

}
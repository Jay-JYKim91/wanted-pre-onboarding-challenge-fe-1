export function logIn(data: {email: string, password: string}) {
    fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.details === "로그인에 실패했습니다") {
            window.alert("Invalid email or password.")
          } else if (res.message === "성공적으로 로그인 했습니다") {
            window.localStorage.setItem("userToken", res.token)
            navigate("/")
          }
        })
}

export function signUp() {

}
import React, { useState } from "react"

type logInOrSignUp = "logIn" | "signUp"

function Auth() {
  const [logInOrSignUp, setLogInOrSignUp] = useState<logInOrSignUp>("logIn")

  function test() {
    const data = {
      email: "randomEmail@email.com",
      password: "testPassword",
    }

    fetch("http://localhost:8080/users/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => console.log(res))
  }

  return (
    <div>
      {/* <button onClick={test}>API Connection Test</button> */}
      <div className="max-w-[300px] m-auto my-8">
        <h1 className="font-bold text-xl uppercase">{logInOrSignUp}</h1>
        <form className="my-4" onSubmit={test}>
          <div className="flex flex-col mb-2">
            <label htmlFor="emailForLogin">Email</label>
            <input
              type="email"
              id="emailForLogin"
              className="border rounded"
              required
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="passwordForLogin">Password</label>
            <input
              type="password"
              id="passwordForLogin"
              className="border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-1 my-4 uppercase rounded bg-primary-900 text-white shadow-lg"
          >
            {logInOrSignUp}
          </button>
        </form>
        {logInOrSignUp === "logIn" ? (
          <p className="text-right">
            Need an account?{" "}
            <button
              type="button"
              className="underline"
              onClick={() => setLogInOrSignUp("signUp")}
            >
              SIGN UP
            </button>
          </p>
        ) : (
          <p className="text-right">
            Already a user?{" "}
            <button
              type="button"
              className="underline"
              onClick={() => setLogInOrSignUp("logIn")}
            >
              LOGIN
            </button>
          </p>
        )}
      </div>
    </div>
  )
}

export default Auth

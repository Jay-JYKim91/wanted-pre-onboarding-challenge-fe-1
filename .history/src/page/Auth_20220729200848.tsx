import React, { useState } from "react"

type logInOrSignUp = "logIn" | "signUp"
function Auth() {
  const [logInOrSignUp, setLogInOrSignUp] = useState<logInOrSignUp>("logIn")

  return (
    <div>
      <div className="max-w-[300px] m-auto my-8">
        <h1 className="font-bold text-xl">{logInOrSignUp}</h1>
        <form className="my-4">
          <div className="flex flex-col mb-2">
            <label htmlFor="emailForLogin">Email</label>
            <input type="email" id="emailForLogin" className="border rounded" />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="passwordForLogin">Password</label>
            <input
              type="password"
              id="passwordForLogin"
              className="border rounded"
            />
          </div>
          <button
            type="button"
            className="w-full py-1 my-4 rounded bg-primary-900 text-white shadow-lg"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  )
}

export default Auth

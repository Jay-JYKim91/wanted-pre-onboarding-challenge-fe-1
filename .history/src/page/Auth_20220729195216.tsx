import React from "react"

function Auth() {
  return (
    <div>
      <div className="max-w-[300px] m-auto">
        <h1>LOGIN</h1>
        <form>
          <div className="flex flex-col">
            <label htmlFor="emailForLogin">Email</label>
            <input type="email" id="emailForLogin" className="border rounded" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="passwordForLogin">Password</label>
            <input type="password" id="passwordForLogin" />
          </div>
          <button type="button">LOGIN</button>
        </form>
      </div>
    </div>
  )
}

export default Auth

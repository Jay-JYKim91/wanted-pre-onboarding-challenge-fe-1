import React from "react"

function Auth() {
  return (
    <div>
      <div>
        <h1>LOGIN</h1>
        <form>
          <label htmlFor="emailForLogin">Email</label>
          <input type="email" id="emailForLogin" />
          <label htmlFor="passwordForLogin">Password</label>
          <input type="password" id="passwordForLogin" />
          <button type="button">LOGIN</button>
        </form>
      </div>
    </div>
  )
}

export default Auth

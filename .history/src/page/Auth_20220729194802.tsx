import React from "react"

function Auth() {
  return (
    <div>
      <div>
        <h1>LOGIN</h1>
        <form>
          <div>
            <label htmlFor="emailForLogin">Email</label>
            <input type="email" id="emailForLogin" />
          </div>
          <div>
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

import React from "react"

function Auth() {
  return (
    <div>
      <div className="max-w-[300px] m-auto">
        <h1 className="font-bold text-xl">LOGIN</h1>
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
          <button type="button" className="w-full bg-primary-900 text-white">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  )
}

export default Auth

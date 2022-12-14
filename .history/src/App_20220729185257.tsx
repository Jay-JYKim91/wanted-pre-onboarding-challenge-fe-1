import React from "react"
import logo from "./logo.svg"
import "./App.css"
import axios from "axios"

function App() {
  function test() {
    axios
      .post("http://localhost:8080/users/create", {
        email: "asefs@gmail.com",
        password: "12345678",
      })
      .then((response) => {
        console.log(response)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button type="button" onClick={() => test()}>
        click
      </button>
    </div>
  )
}

export default App

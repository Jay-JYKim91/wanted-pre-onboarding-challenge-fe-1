import React, { useEffect, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import Auth from "./page/Auth"
import Main from "./page/Main"

// type UserToken = {
//   userToken: string | null
// }

function App() {
  const navigate = useNavigate()
  const userToken = window.localStorage.getItem("userToken")
  const [todos, setTodos] = useState([])

  console.log(userToken)
  useEffect(() => {
    if (userToken === "") {
      window.alert("Please login first.")
      navigate("/auth")
    } else {
      // const headers = {
      //   Authorization: userToken,
      // }
      // fetch("http://localhost:8080/todos")
      //   .then((response) => response.json())
      //   .then((res) => {
      //     console.log(res)
      //   })
    }
  }, [])

  return (
    <div className="App">
      <header className="bg-primary-900 text-white text-center py-4 text-2xl">
        <span>TODOs</span>
      </header>
      <Routes>
        <Route path="/" element={<Main todos={todos} />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App

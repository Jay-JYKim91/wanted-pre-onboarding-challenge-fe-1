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

  useEffect(() => {
    if (userToken === "") {
      window.alert("Please login first.")
      navigate("/auth")
    } else {
      fetch("http://localhost:8080/todos", {
        method: "GET",
        headers: { Authorization: userToken! },
      })
        .then((response) => response.json())
        .then((res) => {
          setTodos(res.data)
        })
    }
  }, [])

  return (
    <div className="App">
      <header className="bg-primary-900 text-white text-center py-4 text-2xl">
        <span>TODOs</span>
      </header>
      <Routes>
        <Route path="/" element={<Main todos={todos} />} />
        <Route path="/:id" element={<Main todos={todos} />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App

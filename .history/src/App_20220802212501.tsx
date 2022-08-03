import React, { useEffect, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import Auth from "./page/Auth"
import Main from "./page/Main"
import { getTodos } from "./services/todoAPI"

function App() {
  const navigate = useNavigate()
  const userToken = window.localStorage.getItem("userToken")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    if (userToken === "") {
      window.alert("Please login first.")
      navigate("/auth")
    } else {
      getTodos(userToken!).then((result) => {
        setTodos(result.data)
      })
    }
  }, [])

  return (
    <div className="App">
      <header className="bg-primary-900 text-white text-center py-4 text-2xl">
        <span>TODOs</span>
      </header>
      <Routes>
        <Route
          path="/"
          exac
          element={<Main todos={todos} setTodos={setTodos} />}
        />
        <Route
          path="/:id"
          element={<Main todos={todos} setTodos={setTodos} />}
        />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App

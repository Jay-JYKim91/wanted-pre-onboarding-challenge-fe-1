import React, { useEffect, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import Auth from "./page/Auth"
import Main from "./page/Main"

function App() {
  const navigate = useNavigate()
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const userToken = window.localStorage.getItem("userToken")
    if (userToken === "") {
      window.alert("Please login first.")
      navigate("/auth")
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

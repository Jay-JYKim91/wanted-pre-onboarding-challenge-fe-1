import React, { useEffect, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import Auth from "./page/Auth"
import Main from "./page/Main"
import { getTodos } from "./services/todoAPI"
import { IoLogOut } from "react-icons/io"

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
      <header className="bg-primary-900 text-white text-center py-4 text-2xl relative">
        <div className="max-w-xs md:max-w-lg mx-auto">
          <span>TODOs</span>
          <button className="">
            <IoLogOut />
          </button>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Main todos={todos} setTodos={setTodos} />} />
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

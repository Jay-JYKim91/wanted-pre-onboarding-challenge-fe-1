import React, { useEffect, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import Auth from "./page/Auth"
import Main from "./page/Main"
import { getTodos } from "./services/todoAPI"
import { IoLogOut } from "react-icons/io5"
import { useQuery } from "react-query"
import { AxiosError } from "axios"

function App() {
  const navigate = useNavigate()
  const userToken = window.localStorage.getItem("userToken")
  const [todos, setTodos] = useState([])

  const getTodosReq = useQuery("getTodos", () => getTodos(userToken!), {
    onSuccess: (result) => {
      setTodos(result.data.data)
    },
    onError: (error: AxiosError) => {
      console.error(error.message)
    },
  })

  useEffect(() => {
    if (userToken === "") {
      window.alert("Please login first.")
      navigate("/auth")
    } else {
      getTodosReq.refetch()
    }
  }, [userToken])

  return (
    <div className="App">
      <header className="bg-primary-900 text-white text-center py-4 text-2xl ">
        <div className="max-w-xs md:max-w-lg mx-auto relative">
          <span>TODOs</span>
          {userToken !== "" && (
            <button
              className="absolute right-0 bottom-0 border-2 rounded border-primary-900 hover:bg-white hover:text-primary-900"
              onClick={() => {
                window.localStorage.setItem("userToken", "")
                navigate("/auth")
              }}
            >
              <IoLogOut />
            </button>
          )}
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

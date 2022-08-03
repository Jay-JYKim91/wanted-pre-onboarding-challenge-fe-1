import React, { useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import Auth from "./page/Auth"

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    const userToken = window.localStorage.getItem("userToken")
    console.log(userToken)
  })
  return (
    <div className="App">
      <header className="bg-primary-900 text-white text-center py-4 text-2xl">
        <span>TODOs</span>
      </header>
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App

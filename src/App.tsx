import React from "react"
import { Route, Routes } from "react-router-dom"
import Auth from "./page/Auth"

function App() {
  return (
    <div className="App">
      <header>Todo App</header>
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App

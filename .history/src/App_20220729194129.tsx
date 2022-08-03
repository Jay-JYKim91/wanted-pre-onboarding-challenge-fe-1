import React from "react"
import { Route, Routes } from "react-router-dom"
import Auth from "./page/Auth"

function App() {
  return (
    <div className="App">
      <header className="bg-primary-900 text-white">
        <span className="text-lg">Todo App</span>
      </header>
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App

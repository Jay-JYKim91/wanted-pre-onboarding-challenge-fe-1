import React, { useState } from "react"
import { MdPlaylistAdd } from "react-icons/md"

type Props = {
  todos: []
}

function Main<Props>({ todos }) {
  console.log(todos)
  const [titleInput, setTitleInput] = useState("")
  const [contentInput, setContentInput] = useState("")

  return (
    <div className="max-w-xs mx-auto my-8">
      <button
        type="button"
        className="flex items-center border rounded bg-primary-900 text-white px-2 py-1 w-full"
      >
        <MdPlaylistAdd className="mr-2 text-2xl" />
        <span className="text-xl">Add a task...</span>
      </button>
      <form>
        <input
          type="text"
          id="titleInput"
          onChange={(event) => setTitleInput(event.target.value)}
        />
        <input
          type="text"
          id="contentInput"
          onChange={(event) => setContentInput(event.target.value)}
        />
      </form>
    </div>
  )
}

export default Main

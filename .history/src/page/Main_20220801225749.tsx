import React, { useState } from "react"
import { MdPlaylistAdd, MdLibraryAdd } from "react-icons/md"

type Props = {
  todos: []
}

function Main<Props>({ todos }) {
  console.log(todos)
  const [titleInput, setTitleInput] = useState("")
  const [contentInput, setContentInput] = useState("")

  function handleTodoAddForm() {
    const btn = document.getElementById("addTodoBtn")
    const form = document.getElementById("addTodoForm")
    btn!.style.display = "none"
    form!.style.display = "block"
  }
  return (
    <div className="max-w-xs mx-auto my-8">
      <button
        id="addTodoBtn"
        type="button"
        className="flex items-center border rounded bg-primary-900 text-white px-2 py-1 w-full"
        onClick={handleTodoAddForm}
      >
        <MdPlaylistAdd className="mr-2 text-2xl" />
        <span className="text-xl">Add a todo...</span>
      </button>
      <form className="my-4 hidden" id="addTodoForm">
        <div className="flex flex-col mb-2">
          <label htmlFor="titleInput">Title</label>
          <input
            type="text"
            id="titleInput"
            required
            onChange={(event) => setTitleInput(event.target.value)}
            className="border rounded"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="contentInput">Content</label>
          <textarea
            name="contentInput"
            id="contentInput"
            cols={30}
            rows={3}
            onChange={(event) => setContentInput(event.target.value)}
            className="border rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          className="p-2 my-4 float-right flex items-center rounded bg-primary-900 text-white shadow-lg"
        >
          <MdLibraryAdd className="mr-2" />
          <span>Add a todo</span>
        </button>
      </form>
    </div>
  )
}

export default Main

import React, { useState } from "react"
import { MdPlaylistAdd, MdLibraryAdd } from "react-icons/md"

type Props = {
  todos: TodoProps[]
}

type DisplayForm = "open" | "close"

type TodoProps = {
  title: string
  content: string
  id: string
  createdAt: string
  updatedAt: string
}

function Main({ todos }: Props) {
  console.log(todos)
  const [titleInput, setTitleInput] = useState("")
  const [contentInput, setContentInput] = useState("")

  function handleTodoAddForm(displayForm: DisplayForm) {
    const btn = document.getElementById("addTodoBtn")
    const form = document.getElementById("addTodoForm")

    if (displayForm === "open") {
      btn!.style.display = "none"
      form!.style.display = "block"
    } else {
      btn!.style.display = "flex"
      form!.style.display = "none"
    }
  }

  function handleAddTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const userToken = window.localStorage.getItem("userToken")
    const data = {
      title: titleInput,
      content: contentInput,
    }

    fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken!,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setTitleInput("")
          setContentInput("")
          handleTodoAddForm("close")
        }
      })
  }

  return (
    <div className="max-w-xs md:max-w-lg mx-auto my-8">
      <div>
        <button
          id="addTodoBtn"
          type="button"
          className="flex items-center border rounded bg-primary-900 text-white px-2 py-1 w-fit mr-0"
          onClick={() => handleTodoAddForm("open")}
        >
          <MdPlaylistAdd className="mr-2 text-2xl" />
          <span className="text-xl">Add a todo...</span>
        </button>
      </div>

      <form
        className="my-4 hidden"
        id="addTodoForm"
        onSubmit={(event) => handleAddTodo(event)}
      >
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
      <ul>
        {todos.map((todo: TodoProps) => {
          return <li>{todo.title}</li>
        })}
      </ul>
    </div>
  )
}

export default Main

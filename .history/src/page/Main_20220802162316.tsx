import React, { useEffect, useState } from "react"
import {
  MdPlaylistAdd,
  MdLibraryAdd,
  MdOutlineEditNote,
  MdDelete,
} from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"

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
  const navigate = useNavigate()
  const { id } = useParams()
  const userToken = window.localStorage.getItem("userToken")
  const [titleInput, setTitleInput] = useState("")
  const [contentInput, setContentInput] = useState("")
  const [activeTodoId, setActiveTodoId] = useState("")
  const [activeTodo, setActiveTodo] = useState<TodoProps>()
  const liStyleDefault = "border p-1 text-white cursor-pointer bg-primary-500"
  const liStyleActive =
    "border p-1 text-white cursor-pointer bg-primary-900 font-extrabold"

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

  useEffect(() => {
    if (id) {
      setActiveTodoId(id)
    }
  }, [id])

  useEffect(() => {
    fetch(`http://localhost:8080/todos/${id}`, {
      method: "GET",
      headers: { Authorization: userToken! },
    })
      .then((response) => response.json())
      .then((res) => {
        setActiveTodo(res.data)
      })
  }, [activeTodoId])

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
      <div className="relative">
        <button
          id="addTodoBtn"
          type="button"
          className="flex items-center border rounded bg-primary-900 text-white px-2 py-1 w-fit absolute right-0"
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
      <div className="pt-16 flex">
        <ul className="basis-1/3 p-2">
          {todos.map((todo: TodoProps) => {
            return (
              <li
                onClick={() => {
                  setActiveTodoId(todo.id)
                  navigate(`/${todo.id}`)
                }}
                key={todo.id}
                className={
                  activeTodoId === todo.id ? liStyleActive : liStyleDefault
                }
              >
                {todo.title}
              </li>
            )
          })}
        </ul>
        <div className="basis-2/3 p-2">
          {activeTodo && (
            <div>
              <div className="flex justify-between">
                <p>{activeTodo.title}</p>
                <div className="flex text-xl">
                  <button type="button">
                    <MdOutlineEditNote />
                  </button>
                  <button type="button">
                    <MdDelete />
                  </button>
                </div>
              </div>

              <p>{activeTodo.updatedAt.split("T")[0]}</p>
              <p>{activeTodo.content}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Main

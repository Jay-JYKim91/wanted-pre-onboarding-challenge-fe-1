import React, { useEffect, useState } from "react"
import { MdPlaylistAdd, MdLibraryAdd, MdOutlineEditOff } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import ActiveTodo from "../component/ActiveTodo"
import {
  getTodoById,
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../services/todoAPI"

type Props = {
  todos: TodoProps[]
  setTodos: React.Dispatch<React.SetStateAction<never[]>>
}

export type TodoProps = {
  title: string
  content: string
  id: string
  createdAt: string
  updatedAt: string
}

function Main({ todos, setTodos }: Props) {
  const navigate = useNavigate()
  const { id } = useParams()
  const userToken = window.localStorage.getItem("userToken")
  const [titleInput, setTitleInput] = useState("")
  const [contentInput, setContentInput] = useState("")
  const [editedTitleInput, setEditedTitleInput] = useState("")
  const [editedContentInput, setEditedContentInput] = useState("")
  const [activeTodoId, setActiveTodoId] = useState("")
  const [activeTodo, setActiveTodo] = useState<TodoProps>()
  const liStyleDefault =
    "rounded mb-1 p-1 text-white cursor-pointer bg-primary-500 text-ellipsis"
  const liStyleActive =
    "rounded mb-1 p-1 text-white cursor-pointer bg-primary-900 font-bold"

  function handleDisplayTodoAddForm(displayForm: DisplayForm) {
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
    } else {
      const lastActiveTodo = window.localStorage.getItem("activeTodoId")
      setActiveTodoId(lastActiveTodo!)
    }
  }, [id])

  useEffect(() => {
    if (activeTodoId !== "") {
      getTodoById(activeTodoId, userToken!).then((result) => {
        setActiveTodo(result.data)
        setEditedTitleInput(result.data.title)
        setEditedContentInput(result.data.content)
        window.localStorage.setItem("activeTodoId", activeTodoId)
      })
    }
    if (document.getElementById("originalTitle")) {
      handleTodoEditForm("close")
    }
  }, [activeTodoId, userToken])

  useEffect(() => {
    navigate("/")
  }, [todos, navigate])

  function handleAddTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const userToken = window.localStorage.getItem("userToken")
    const data = {
      title: titleInput,
      content: contentInput,
    }

    createTodo(data, userToken!).then((result) => {
      if (result.data) {
        setTitleInput("")
        setContentInput("")
        handleDisplayTodoAddForm("close")
        getTodos(userToken!).then((result) => {
          setTodos(result.data)
        })
      }
    })
  }

  function handleDeleteTodo(id: string) {
    const confirm = window.confirm(
      "Are you sure you want to permanently delete this todo?"
    )

    if (confirm) {
      deleteTodo(id, userToken!).then((result) => {
        if (result.data === null) {
          getTodos(userToken!).then((res) => {
            setTodos(res.data)
          })
          setActiveTodoId("")
          setActiveTodo(undefined)
        }
      })
    }
  }

  function handleEditTodo(id: string) {
    const data = {
      title: editedTitleInput,
      content: editedContentInput,
    }

    updateTodo(id, userToken!, data).then((result) => {
      handleTodoEditForm("close")
      setActiveTodo(result.data)
      getTodos(userToken!).then((res) => {
        setTodos(res.data)
      })
    })
  }

  return (
    <div className="max-w-xs md:max-w-lg mx-auto my-8">
      <div className="relative">
        <button
          id="addTodoBtn"
          type="button"
          className="flex items-center border rounded bg-primary-900 text-white px-2 py-1 w-fit absolute right-0"
          onClick={() => handleDisplayTodoAddForm("open")}
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
        <h1 className="text-xl text-center">Add a todo</h1>
        <div className="flex justify-end text-xl">
          <button
            type="submit"
            className="p-1 my-4 mr-1 rounded bg-primary-900 text-white shadow-lg"
            onClick={() => handleDisplayTodoAddForm("close")}
          >
            <MdOutlineEditOff />
          </button>
          <button
            type="submit"
            className="p-1 my-4 rounded bg-primary-900 text-white shadow-lg"
          >
            <MdLibraryAdd />
          </button>
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="titleInput">Title</label>
          <input
            type="text"
            id="titleInput"
            value={titleInput}
            required
            onChange={(event) => setTitleInput(event.target.value)}
            className="border rounded px-1"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="contentInput">Content</label>
          <textarea
            name="contentInput"
            id="contentInput"
            cols={30}
            rows={3}
            value={contentInput}
            onChange={(event) => setContentInput(event.target.value)}
            className="border rounded px-1"
          ></textarea>
        </div>
      </form>
      <div className="pt-16 flex flex-col md:flex-row">
        <ul className="basis-1/3 p-2 max-h-[200px] overflow-scroll">
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
            <ActiveTodo
              activeTodo={activeTodo}
              // handleTodoEditForm={handleTodoEditForm}
              handleDeleteTodo={handleDeleteTodo}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Main

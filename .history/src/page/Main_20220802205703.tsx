import React, { useEffect, useState } from "react"
import {
  MdPlaylistAdd,
  MdLibraryAdd,
  MdOutlineEditNote,
  MdDelete,
  MdOutlineEditOff,
  MdPlaylistAddCheck,
} from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
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

type DisplayForm = "open" | "close"

type TodoProps = {
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
    "rounded mb-1 p-1 text-white cursor-pointer bg-primary-500"
  const liStyleActive =
    "rounded mb-1 p-1 text-white cursor-pointer bg-primary-900 font-bold"

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

  function handleTodoEditForm(displayForm: DisplayForm) {
    const originalTitle = document.getElementById("originalTitle")
    const originalContent = document.getElementById("originalContent")
    const originalButtons = document.getElementById("originalButtons")
    const editedTitleInput = document.getElementById("editedTitleInput")
    const editedContentInput = document.getElementById("editedContentInput")
    const editButtons = document.getElementById("editButtons")

    if (displayForm === "open") {
      originalTitle!.style.display = "none"
      originalContent!.style.display = "none"
      originalButtons!.style.display = "none"
      editedTitleInput!.style.display = "flex"
      editedContentInput!.style.display = "flex"
      editButtons!.style.display = "flex"
    } else {
      originalTitle!.style.display = "flex"
      originalContent!.style.display = "flex"
      originalButtons!.style.display = "flex"
      editedTitleInput!.style.display = "none"
      editedContentInput!.style.display = "none"
      editButtons!.style.display = "none"
    }
  }

  useEffect(() => {
    if (id) {
      setActiveTodoId(id)
    }
  }, [id])

  useEffect(() => {
    if (activeTodoId !== "") {
      getTodoById(id!, userToken!).then((result) => {
        setActiveTodo(result.data)
        setEditedTitleInput(result.data.title)
        setEditedContentInput(result.data.content)
        handleTodoEditForm("close")
      })
    }
  }, [activeTodoId])

  useEffect(() => {
    navigate("/")
  }, [todos])

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
        handleTodoAddForm("close")
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
              <div className="flex justify-between items-center">
                <h1 className="text-2xl" id="originalTitle">
                  {activeTodo.title}
                </h1>
                <input
                  type="text"
                  id="editedTitleInput"
                  value={editedTitleInput}
                  onChange={(event) => setEditedTitleInput(event.target.value)}
                  className="border hidden text-2xl px-1"
                />
                <div className="flex text-2xl text-white" id="originalButtons">
                  <button
                    type="button"
                    className="mr-1 bg-primary-900 rounded border-2 border-primary-900 hover:bg-white hover:text-primary-900"
                    onClick={() => handleTodoEditForm("open")}
                  >
                    <MdOutlineEditNote />
                  </button>
                  <button
                    type="button"
                    className="bg-primary-900 rounded border-2 border-primary-900 hover:bg-white hover:text-primary-900"
                    onClick={() => handleDeleteTodo(activeTodo.id)}
                  >
                    <MdDelete />
                  </button>
                </div>
                <div className="text-2xl text-white hidden" id="editButtons">
                  <button
                    type="button"
                    className="mr-1 bg-primary-900 rounded border-2 border-primary-900 hover:bg-white hover:text-primary-900"
                    onClick={() => handleTodoEditForm("close")}
                  >
                    <MdOutlineEditOff />
                  </button>
                  <button
                    type="button"
                    className="bg-primary-900 rounded border-2 border-primary-900 hover:bg-white hover:text-primary-900"
                    onClick={() => handleEditTodo(activeTodo.id)}
                  >
                    <MdPlaylistAddCheck />
                  </button>
                </div>
              </div>

              <p className="text-sm text-neutral-500">
                {activeTodo.updatedAt.split("T")[0]}
              </p>
              <p className="mt-2" id="originalContent">
                {activeTodo.content}
              </p>
              <textarea
                name="editedContentInput"
                id="editedContentInput"
                value={editedContentInput}
                onChange={(event) => setEditedContentInput(event.target.value)}
                cols={30}
                rows={3}
                className="border px-1 hidden mt-2"
              ></textarea>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Main

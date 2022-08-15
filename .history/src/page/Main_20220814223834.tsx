import { AxiosError } from "axios"
import React, { useEffect, useState } from "react"
import { MdPlaylistAdd } from "react-icons/md"
import { useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import ActiveTodo from "../component/ActiveTodo"
import AddForm, { TodoData } from "../component/AddForm"
import { getTodoById } from "../services/todoAPI"

type Props = {
  todos: AllTodoData[]
  setTodos: React.Dispatch<React.SetStateAction<never[]>>
}

export type DisplayForm = "open" | "close"

export interface AllTodoData extends TodoData {
  id: string
  createdAt: string
  updatedAt: string
}

function Main({ todos, setTodos }: Props) {
  const navigate = useNavigate()
  const { id } = useParams()
  const userToken = window.localStorage.getItem("userToken")
  const [activeTodoId, setActiveTodoId] = useState("")
  const [activeTodo, setActiveTodo] = useState<AllTodoData>()
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
    } else {
      const lastActiveTodo = window.localStorage.getItem("activeTodoId")
      setActiveTodoId(lastActiveTodo!)
    }
  }, [id])

  const getTodoByIdReq = useQuery(
    "getTodoById",
    () => getTodoById(activeTodoId, userToken!),
    {
      onSuccess: (result) => {
        console.log(result.data.data)
        setActiveTodo(result.data.data)
        // setTodos(result.data.data)
      },
      onError: (error: AxiosError) => {
        console.error(error.message)
      },
    }
  )

  useEffect(() => {
    if (activeTodoId !== "") {
      window.localStorage.setItem("activeTodoId", activeTodoId)
      getTodoByIdReq.refetch()
      // getTodoById(activeTodoId, userToken!)
      //   .then((result) => {
      //     setActiveTodo(result.data)
      //   })
      //   .catch((error) => alert(error.message))
    }
    if (document.getElementById("originalTitle")) {
      handleTodoEditForm("close")
    }
  }, [activeTodoId, userToken])

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

      <AddForm
        handleDisplayTodoAddForm={handleDisplayTodoAddForm}
        setTodos={setTodos}
      />

      <div className="pt-16 flex flex-col md:flex-row">
        <ul className="basis-1/3 p-2 max-h-[200px] overflow-scroll">
          {todos.map((todo: AllTodoData) => {
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
              handleTodoEditForm={handleTodoEditForm}
              setActiveTodo={setActiveTodo}
              setTodos={setTodos}
              activeTodoId={activeTodoId}
              setActiveTodoId={setActiveTodoId}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Main

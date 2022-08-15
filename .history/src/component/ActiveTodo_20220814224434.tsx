import { AxiosError } from "axios"
import React, { useEffect, useState } from "react"
import {
  MdOutlineEditNote,
  MdDelete,
  MdOutlineEditOff,
  MdPlaylistAddCheck,
} from "react-icons/md"
import { useMutation, useQuery } from "react-query"
import { AllTodoData, DisplayForm } from "../page/Main"
import {
  getTodos,
  updateTodo,
  getTodoById,
  deleteTodo,
} from "../services/todoAPI"
import { TodoData } from "./AddForm"

type Props = {
  activeTodo: AllTodoData
  activeTodoId: string
  setActiveTodoId: React.Dispatch<React.SetStateAction<string>>
  handleTodoEditForm: (displayForm: DisplayForm) => void
  setActiveTodo: React.Dispatch<React.SetStateAction<AllTodoData | undefined>>
  setTodos: React.Dispatch<React.SetStateAction<never[]>>
}

function ActiveTodo({
  activeTodo,
  handleTodoEditForm,
  setActiveTodo,
  setTodos,
  activeTodoId,
  setActiveTodoId,
}: Props) {
  const [editedTitleInput, setEditedTitleInput] = useState("")
  const [editedContentInput, setEditedContentInput] = useState("")
  const userToken = window.localStorage.getItem("userToken")

  const getTodoByIdReq = useMutation(
    "getTodoById",
    () => getTodoById(activeTodoId, userToken!),
    {
      onSuccess: (result) => {
        setEditedTitleInput(result.data.data.title)
        setEditedContentInput(result.data.data.content)
      },
      onError: (error: AxiosError) => {
        console.error(error.message)
      },
    }
  )

  useEffect(() => {
    if (activeTodoId !== "") {
      getTodoByIdReq.mutate()
      getTodoById(activeTodoId, userToken!)
        .then((result) => {
          setEditedTitleInput(result.data.title)
          setEditedContentInput(result.data.content)
        })
        .catch((error) => alert(error.message))
    }
  }, [activeTodoId, userToken])

  const getTodosReq = useQuery("getTodos", () => getTodos(userToken!), {
    onSuccess: (result) => {
      setTodos(result.data.data)
    },
    onError: (error: AxiosError) => {
      console.error(error.message)
    },
  })

  const updateTodoReq = useMutation(
    (props: { id: string; data: TodoData }) =>
      updateTodo(props.id, userToken!, props.data),
    {
      onSuccess: (result) => {
        handleTodoEditForm("close")
        setActiveTodo(result.data.data)
        getTodosReq.refetch()
      },
      onError: (error: AxiosError) => {
        console.error(error.message)
      },
    }
  )

  function handleEditTodo(id: string) {
    const data: TodoData = {
      title: editedTitleInput,
      content: editedContentInput,
    }

    updateTodoReq.mutate({ id, data })
  }

  const deleteTodoReq = useMutation(
    (id: string) => deleteTodo(id, userToken!),
    {
      onSuccess: (result) => {
        if (result.data.data === null) {
          getTodosReq.refetch()
          setActiveTodoId("")
          setActiveTodo(undefined)
        }
      },
      onError: (error: AxiosError) => {
        console.error(error.message)
      },
    }
  )

  function handleDeleteTodo(id: string) {
    const confirm = window.confirm(
      "Are you sure you want to permanently delete this todo?"
    )

    if (confirm) {
      deleteTodoReq.mutate(id)
    }
  }

  return (
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
          className="border hidden text-2xl px-1 max-w-[230px]"
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
            onClick={() => {
              handleTodoEditForm("close")
              setEditedTitleInput(activeTodo.title)
              setEditedContentInput(activeTodo.content)
            }}
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
        rows={3}
        className="border px-1 hidden mt-2 w-full"
      ></textarea>
    </div>
  )
}

export default ActiveTodo

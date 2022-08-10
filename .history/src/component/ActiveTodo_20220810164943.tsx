import React, { useEffect, useState } from "react"
import {
  MdOutlineEditNote,
  MdDelete,
  MdOutlineEditOff,
  MdPlaylistAddCheck,
} from "react-icons/md"
import { TodoProps, DisplayForm } from "../page/Main"
import {
  getTodos,
  updateTodo,
  getTodoById,
  deleteTodo,
} from "../services/todoAPI"

type Props = {
  activeTodo: TodoProps
  activeTodoId: string
  setActiveTodoId: React.Dispatch<React.SetStateAction<string>>
  handleTodoEditForm: (displayForm: DisplayForm) => void
  setActiveTodo: React.Dispatch<React.SetStateAction<TodoProps | undefined>>
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

  useEffect(() => {
    if (activeTodoId !== "") {
      getTodoById(activeTodoId, userToken!).then((result) => {
        setEditedTitleInput(result.data.title)
        setEditedContentInput(result.data.content)
      })
    }
  }, [activeTodoId, userToken])

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

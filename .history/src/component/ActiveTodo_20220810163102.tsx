import React, { useState } from "react"
import {
  MdOutlineEditNote,
  MdDelete,
  MdOutlineEditOff,
  MdPlaylistAddCheck,
} from "react-icons/md"
import { TodoProps, DisplayForm } from "../page/Main"
import { getTodos, updateTodo } from "../services/todoAPI"

type Props = {
  activeTodo: TodoProps
  handleTodoEditForm: (displayForm: DisplayForm) => void
  handleDeleteTodo: (id: string) => void
  setActiveTodo: React.Dispatch<React.SetStateAction<TodoProps | undefined>>
  setTodos: React.Dispatch<React.SetStateAction<never[]>>
}

function ActiveTodo({
  activeTodo,
  handleTodoEditForm,
  handleDeleteTodo,
  setActiveTodo,
  setTodos,
}: Props) {
  const [editedTitleInput, setEditedTitleInput] = useState("")
  const [editedContentInput, setEditedContentInput] = useState("")
  const userToken = window.localStorage.getItem("userToken")

  //   useEffect(() => {
  //     if (activeTodoId !== "") {
  //       getTodoById(activeTodoId, userToken!).then((result) => {
  //         setActiveTodo(result.data)
  //         setEditedTitleInput(result.data.title)
  //         setEditedContentInput(result.data.content)
  //         window.localStorage.setItem("activeTodoId", activeTodoId)
  //       })
  //     }
  //     if (document.getElementById("originalTitle")) {
  //       handleTodoEditForm("close")
  //     }
  //   }, [activeTodoId, userToken])

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

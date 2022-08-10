import React from "react"
import {
  MdOutlineEditNote,
  MdDelete,
  MdOutlineEditOff,
  MdPlaylistAddCheck,
} from "react-icons/md"
import { TodoProps, DisplayForm } from "../page/Main"

type Props = {
  activeTodo: TodoProps
  handleTodoEditForm: (displayForm: DisplayForm) => void
}

function ActiveTodo({ activeTodo }: Props) {
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

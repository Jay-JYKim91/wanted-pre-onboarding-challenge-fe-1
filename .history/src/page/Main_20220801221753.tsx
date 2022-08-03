import React from "react"
import { MdPlaylistAdd } from "react-icons/md"

type Props = {
  todos: []
}
function Main<Props>(todos) {
  return (
    <div className="max-w-xs mx-auto my-8">
      <button
        type="button"
        className="flex items-center border rounded bg-primary-900 text-white px-2 py-1 w-full"
      >
        <MdPlaylistAdd className="mr-2 text-2xl" />
        <span className="text-xl">Add a task...</span>
      </button>
    </div>
  )
}

export default Main

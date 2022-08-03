import React from "react"
import { MdPlaylistAdd } from "react-icons/md"

function Main() {
  return (
    <div className="max-w-xs mx-auto my-8">
      <button
        type="button"
        className="flex items-center border rounded bg-primary-900 text-white"
      >
        <MdPlaylistAdd className="mr-2 text-2xl" />
        <span className="text-xl">Add a task...</span>
      </button>
    </div>
  )
}

export default Main

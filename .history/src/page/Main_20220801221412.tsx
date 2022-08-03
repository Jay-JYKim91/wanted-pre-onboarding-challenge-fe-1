import React from "react"
import { MdPlaylistAdd } from "react-icons/md"

function Main() {
  return (
    <div className="max-w-xs m-auto">
      <button type="button" className="flex text-xl">
        <MdPlaylistAdd className="mr-2" />
        <span>Add a task...</span>
      </button>
    </div>
  )
}

export default Main

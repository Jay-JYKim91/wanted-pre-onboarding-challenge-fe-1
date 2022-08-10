import React from "react"
import { MdLibraryAdd, MdOutlineEditOff } from "react-icons/md"

function AddForm() {
  const [titleInput, setTitleInput] = useState("")
  const [contentInput, setContentInput] = useState("")
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

  return (
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
  )
}

export default AddForm

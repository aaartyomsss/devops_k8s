import { ChangeEvent, useState } from "react"
import "./App.css"

type Todo = {
  title: string
}

function App() {
  const [todoInput, setTodoInput] = useState("")
  const [todos, _setTodos] = useState<Todo[]>([
    { title: "Title of todo" },
    { title: "Laundry" },
  ])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length < 140) {
      setTodoInput(value)
    }
  }

  const renderTodos = () => {
    return todos.map((t) => <li key={t.title}>{t.title}</li>)
  }

  return (
    <div>
      <input onChange={onChange} value={todoInput} />
      <button>Add todo</button>
      <ul>{renderTodos()}</ul>
    </div>
  )
}

export default App

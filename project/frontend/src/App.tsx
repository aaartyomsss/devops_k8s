import { ChangeEvent, useEffect, useState } from "react"
import "./App.css"
import axios from "axios"

type Todo = {
  id: number
  text: string
  done: boolean
}

function App() {
  const [todoInput, setTodoInput] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const getAndSetTodos = async () => {
      const res = await axios.get<Todo[]>("/api/todos")
      setTodos(res.data)
    }
    getAndSetTodos()
  }, [])

  const postTodo = async () => {
    const res = await axios.post<Todo>("/api/todos", { name: todoInput })
    setTodos([res.data, ...todos])
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length < 140) {
      setTodoInput(value)
    }
  }

  const onSetAsDone = async (t: Todo) => {
    const newValue = !t.done
    const res = await axios.put<Todo>(`/api/todos/${t.id}`, { done: newValue })
    if (res.data.id) {
      setTodos((oldTodos) =>
        oldTodos.map((t) => (t.id === res.data.id ? res.data : t))
      )
    }
  }

  const renderTodos = () => {
    return todos.map((t) => (
      <li key={t.id}>
        {t.text}
        <input
          type="checkbox"
          checked={t.done}
          onChange={() => onSetAsDone(t)}
        />
      </li>
    ))
  }

  return (
    <div>
      <input onChange={onChange} value={todoInput} />
      <button onClick={postTodo}>Add todo</button>
      <ul>{renderTodos()}</ul>
    </div>
  )
}

export default App

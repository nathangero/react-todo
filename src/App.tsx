import { useState } from "react";
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"


function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [todos, setTodos] = useState<{ [key: number]: { [key: string]: any } }>({});

  return (
    <>
      <div className="flex-col text-center">
        <h1 className="text-5xl my-5">To-do</h1>

        <TodoForm setTodos={setTodos} />

        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </>
  )
}

export default App

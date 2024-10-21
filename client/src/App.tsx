import { useState } from "react";
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"


function App() {
  const [todos, setTodos] = useState<{ [key: number]: [string, boolean] }>({});

  return (
    <>
      <div className="flex-col text-center">
        <h1 className="text-5xl my-5">To-do</h1>

        <TodoForm setTodos={setTodos} />

        <TodoList todos={todos} />
      </div>
    </>
  )
}

export default App

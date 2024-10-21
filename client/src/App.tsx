import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"


function App() {
  return (
    <>
      <div className="flex-col text-center">
        <h1 className="text-5xl my-5">To-do</h1>

        <TodoForm />

        <TodoList />
      </div>
    </>
  )
}

export default App

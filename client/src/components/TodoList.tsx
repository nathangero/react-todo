import { useEffect } from "react";

export default function TodoList({ todos, setTodos }: TodoListProps) {
  const INDEX_TODO_NAME = 0;
  const INDEX_TODO_COMPLETION = 1;

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        const response = await fetch("http://localhost:3001/allTodos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const results = await response.json();
        setTodos(results);

      } catch (error: any) {
        console.error(error);
      }
    }

    getAllTodos();
  }, [])

  return (
    <>
      <h2 className="text-3xl">List of Todos</h2>

      <ul className="space-y-2">
        <li className="flex font-bold text-2xl m-auto max-w-xl">
          <span className="flex-1">TODO</span>
          <span className="flex-1">COMPLETED</span>
        </li>


        <hr className="flex m-auto max-w-xl" />
        <>
          {Object.keys(todos).map((key) => {
            const todo = todos[Number(key)];
            return (
              <li key={key} className="flex items-center font-bold text-lg mx-auto max-w-xl border-b border-gray-300 pb-4">
                <p className="flex-1 font-semibold text-3xl">{todo[INDEX_TODO_NAME]}</p>
                <input type="checkbox" className="flex-1 form-checkbox h-6 w-6" checked={todo[INDEX_TODO_COMPLETION]} disabled />
              </li>
            )
          })
          }
        </>
      </ul>
    </>
  )
}

interface TodoListProps {
  todos: { [key: number]: [string, boolean] };
  setTodos: (todos: { [key: number]: [string, boolean] }) => void;
}
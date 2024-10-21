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

      <ul>
        <>
          {Object.keys(todos).map((key) => {
            const todo = todos[Number(key)];
            return (
              <li key={key} className="flex justify-center">
                <label className="font-bold text-3xl mx-2">{todo[INDEX_TODO_NAME]}</label>
                <p className="italic text-3xl mx-2">{todo[INDEX_TODO_COMPLETION] ? <input type="checkbox" checked /> : <input type="checkbox" />}</p>
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
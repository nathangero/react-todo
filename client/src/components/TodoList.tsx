import { ChangeEvent, useEffect } from "react";

export default function TodoList({ todos, setTodos }: TodoListProps) {
  const INDEX_TODO_NAME = 0;
  const INDEX_TODO_COMPLETION = 1;

  const onClickCheckbox = async (event: ChangeEvent<HTMLInputElement>, timestamp: number) => {
    const completed = event.target.checked;
    console.log(completed);

    setTodos({
      ...todos,
      [timestamp]: {
        ...todos[timestamp],
        [INDEX_TODO_COMPLETION]: !!completed
      }
    });
  }

  useEffect(() => {
    // Get all the todos upon page refresh
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
            const todo = todos[key];
            return (
              <li key={key} className="flex items-center font-bold text-lg mx-auto max-w-xl border-b border-gray-300 pb-4">
                <p className="flex-1 font-semibold text-3xl">{todo[INDEX_TODO_NAME]}</p>
                <div className="flex-1">
                  <input
                    type="checkbox"
                    className="form-checkbox h-6 w-6"
                    onChange={(event) => onClickCheckbox(event, key)}
                    checked={todo[INDEX_TODO_COMPLETION]}
                  />
                </div>
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
import { ChangeEvent, useEffect } from "react";

export default function TodoList({ todos, setTodos }: TodoListProps) {
  const KEY_TODO_TITLE = "title";
  const KEY_TODO_COMPLETION = "completed";

  const onClickCheckbox = async (event: ChangeEvent<HTMLInputElement>, timestamp: number) => {
    const completed = event.target.checked;
    // console.log(completed);

    const body = {
      timestamp: timestamp,
      completed: completed
    }

    try {
      const response = await (fetch("http://localhost:3001/todo", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      }));

      const status = response.status;
      if (status !== 200) {
        console.error("Couldn't update todo");
        return;
      }

      const result = await response.json();

      setTodos({
        ...todos,
        [timestamp]: result
      });

    } catch (error: any) {
      console.error(error);
    }
  }

  const onClickDeleteTodo = async (timestamp: number) => {
    try {
      const response = await (fetch(`http://localhost:3001/${timestamp}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }));

      const status = response.status;
      if (status !== 200) {
        console.error("Couldn't delete todo");
        return;
      }

      const result = await response.json();
      console.log("deleted todo");
      setTodos({ ...result });

    } catch (error: any) {
      console.error(error);
    }
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

        const status = response.status;
        if (status !== 200) {
          console.error("Couldn't get all todos");
          return;
        }

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
          <span className="flex-0.5 text-white">d</span>
        </li>


        <hr className="flex m-auto max-w-xl" />
        <>
          {Object.keys(todos).map((key) => {
            const todo = todos[Number(key)];
            console.log("todo:", todo);
            return (
              <li key={key} className="flex items-center font-bold text-lg mx-auto max-w-xl border-b border-gray-300">
                <label className="flex-1 font-semibold text-3xl mb-3">{todo[KEY_TODO_TITLE]}</label>
                <div className="flex-1">
                  <input
                    type="checkbox"
                    className="form-checkbox h-6 w-6"
                    onChange={(event) => onClickCheckbox(event, Number(key))}
                    checked={todo[KEY_TODO_COMPLETION]}
                  />
                </div>
                <button
                  type="button"
                  className="text-white bg-red-700 rounded px-2"
                  onClick={() => onClickDeleteTodo(Number(key))}
                >X</button>
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setTodos: (todos: { [key: number]: { [key: string]: any } }) => void;
}
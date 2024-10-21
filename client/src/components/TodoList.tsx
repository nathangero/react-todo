
export default function TodoList({ todos }: TodoListProps) {
  const INDEX_TODO_NAME = 0;
  const INDEX_TODO_COMPLETION = 1;

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
}
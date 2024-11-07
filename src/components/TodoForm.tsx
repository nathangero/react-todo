import { ChangeEvent, useState } from "react";

export default function TodoForm({ setTodos }: TodoFormProps) {
  const [newTodo, setNewTodo] = useState<string>('');

  const onChangeNewTodo = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  }

  const onSubmitNewTodo = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await fetch("http://localhost:3001/api/todos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "todo": newTodo })
      });

      const status = response.status;
      if (status !== 200) console.error("Couldn't create a new todo");

      const result = await response.json();
      // console.log("result:", result, typeof result);

      setNewTodo(""); // Clear the form input
      setTodos(result);
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={onSubmitNewTodo}>
      <h2 className="text-3xl"> Add a new todo</h2>
      <input className="border-2 rounded border-black p-2"
        value={newTodo}
        onChange={onChangeNewTodo} />
      <button className="bg-blue-500 text-white rounded p-2 m-2">Add</button>
    </form>
  )
}

interface TodoFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setTodos: (todos: { [key: number]: { [key: string]: any } }) => void;
}
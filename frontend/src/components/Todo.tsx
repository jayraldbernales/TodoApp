import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Trash2 } from "lucide-react";

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    axios
      .post("http://localhost:5000/api/todos", { text: newTodo })
      .then((response) => {
        setTodos((prev) => [...prev, response.data]);
        setNewTodo("");
      })
      .catch((error) => console.error(error));
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    axios
      .delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-10">
      {/* Card container */}
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 sm:p-10">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900">
          📝 My Todo List
        </h2>

        {/* Input + Add Button */}
        <div className="flex mb-6 gap-3">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3
                       focus:outline-none focus:ring-4 focus:ring-indigo-400
                       transition shadow-sm placeholder:text-gray-400"
          />
          <button
            onClick={addTodo}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold
                       rounded-xl px-6 py-3 transition-shadow shadow-md
                       active:scale-95"
            aria-label="Add todo"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-100">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-indigo-50 rounded-xl
                         p-4 shadow-sm hover:shadow-md transition cursor-default"
            >
              <div
                className={`flex items-center gap-3 cursor-pointer select-none ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-900"
                }`}
                onClick={() => toggleTodo(todo.id)}
                aria-checked={todo.completed}
                role="checkbox"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggleTodo(todo.id);
                }}
              >
                <CheckCircle
                  className={`w-6 h-6 flex-shrink-0 transition-colors ${
                    todo.completed ? "text-green-500" : "text-gray-300"
                  }`}
                />
                <span className="text-lg font-medium">{todo.text}</span>
              </div>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 transition"
                aria-label={`Delete todo: ${todo.text}`}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-8 text-lg">
            You have no tasks yet. Add one!
          </p>
        )}
      </div>
    </div>
  );
};

export default Todo;

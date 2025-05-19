import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [inputValue, setInputValue] = useState("");
  

  // --------------------------- HANDLERS ---------------------------
  // Add a new todo
  const handleAddTodo = () => {
    if (inputValue.trim() === "") return;
    setTodos([...todos, { text: inputValue, completed: false }]);
    setInputValue("");
  };

  // Delete a todo
  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  // Edit a todo
  const handleEditTodo = (index) => {
    const newText = prompt("Change your todo", todos[index].text);
    if (newText !== null && newText.trim() !== "") {
      const updatedTodos = todos.map((todo, i) =>
        i === index ? { ...todo, text: newText } : todo
      );
      setTodos(updatedTodos);
    }
  }

  // Toggle todo completion
  const handleToggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Local Storage
  const saveTodosToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  useEffect(() => {
    saveTodosToLocalStorage();
  }
  , [todos]);

  

  return (
    <>
      <div>
        <h1>To Do List</h1>
        {/* --------------------------- INPUT --------------------------- */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.trimStart())}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue.trim()) {
              handleAddTodo();
            }
          }}
          placeholder="Add a new task"
          className="m-2 border-1 border-gray-300 rounded p-2"
        >
        </input>
        <button onClick={handleAddTodo} disabled={inputValue.trim().length === 0}>
          ➕
        </button>
        {/* --------------------------- TODO LIST --------------------------- */}
        <ul className="mt-2 w-2xl">
          {todos.map((todo, index) => (
            <li
              key={index}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="rounded-2xl mb-2 bg-indigo-700"
            >
              <span className="ml-6">{todo.text}</span>
              {/* ------------------------buttons ------------------------- */}
              <div className="">
                <button onClick={() => handleEditTodo(index)} className="m-2">
                  ✏️
                </button>
                <button onClick={() => handleDeleteTodo(index)} className="m-2">
                  🗑️
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleTodo(index);
                  }}
                  className="m-2"
                >
                  {todo.completed ? "❌" : "✅"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

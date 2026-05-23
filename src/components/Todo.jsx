import { useState, useEffect } from "react";
import { supabase } from "../config/supabase.config";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  // FETCH
  const getTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("id", { ascending: false });

    if (!error) setTodos(data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  // ADD
  const addTodo = async () => {
    const { error } = await supabase
      .from("todos")
      .insert([{ title, description }]);

    if (!error) {
      setTitle("");
      setDescription("");
      getTodos();
    }
  };

  // DELETE
  const deleteTodo = async (id) => {
    await supabase.from("todos").delete().eq("id", id);
    getTodos();
  };

  // EDIT
  const editTodo = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditId(todo.id);
  };

  // UPDATE
  const updateTodo = async () => {
    await supabase
      .from("todos")
      .update({ title, description })
      .eq("id", editId);

    setTitle("");
    setDescription("");
    setEditId(null);
    getTodos();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Todo App
        </h1>

        {/* INPUT BOX */}
        <div className="bg-white p-5 rounded-2xl shadow-md mb-6">
          <input
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {editId ? (
            <button
              onClick={updateTodo}
              className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold"
            >
              Update Todo
            </button>
          ) : (
            <button
              onClick={addTodo}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold"
            >
              Add Todo
            </button>
          )}
        </div>

        {/* TODO LIST */}
        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white p-4 rounded-2xl shadow flex justify-between items-start"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {todo.title}
                </h2>
                <p className="text-gray-500">{todo.description}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => editTodo(todo)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;

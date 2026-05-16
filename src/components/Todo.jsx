import { useState, useEffect } from "react";
import { supabase } from "../config/supabase.config";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editTodo, setEditTodo] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // GET TODOS
  // const getTodos = async () => {
  //   const { data, error } = await supabase.from("todos").select("*");

  //   console.log("FETCH TODOS:", data, error); // DEBUG

  //   if (!error) {
  //     setTodos(data || []);
  //   } else {
  //     console.log(error.message);
  //   }
  // };

  // useEffect(() => {
  //   getTodos();
  // }, []);
  const getTodos = async () => {
    const { data, error } = await supabase.from("todos").select("*");

    console.log("DATA:", data);
    console.log("ERROR:", error);

    setTodos(data || []);
  };

  // ADD TODO
  const addTodo = async () => {
    console.log("ADDING:", title, description);

    const { error } = await supabase
      .from("todos")
      .insert([{ title, description }]);

    if (!error) {
      setTitle("");
      setDescription("");
      getTodos();
    } else {
      console.log(error.message);
    }
  };

  // DELETE TODO
  const deleteTodo = async (id) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (!error) getTodos();
    else console.log(error.message);
  };

  // START EDIT
  const startEdit = (todo) => {
    setEditTodo(todo);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  // UPDATE TODO
  const updateTodo = async () => {
    const { error } = await supabase
      .from("todos")
      .update({
        title: editTitle,
        description: editDescription,
      })
      .eq("id", editTodo.id);

    if (!error) {
      setEditTodo(null);
      setEditTitle("");
      setEditDescription("");
      getTodos();
    } else {
      console.log(error.message);
    }
  };

  console.log("TODOS STATE:", todos);
  return (
    <div>
      <h2>Todo List</h2>

      {/* INPUTS */}
      <h3>Title</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <h3>Description</h3>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <button onClick={addTodo}>Add Todo</button>

      {/* LIST */}
      {todos?.length === 0 ? (
        <p>No todos found</p>
      ) : (
        todos?.map((todo) => (
          <li
            key={todo.id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            {editTodo?.id === todo.id ? (
              <div>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Title"
                />

                <input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Description"
                />

                <button onClick={updateTodo}>Update</button>
                <button onClick={() => setEditTodo(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>

                <button onClick={() => startEdit(todo)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))
      )}
    </div>
  );
};

export default Todo;

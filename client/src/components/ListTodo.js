import { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodos";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  // Delete Todo Function
  async function deleteTodo(id) {
    try {
      const res = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getTodos() {
    const res = await fetch("http://localhost:5000/todos");

    const todoArray = await res.json();

    setTodos(todoArray);
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">ID #</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* 
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr> 
          */}
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <th scope="row">{todo.todo_id}</th>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodo;

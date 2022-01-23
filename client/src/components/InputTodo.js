import { Fragment, useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("placeholder");

  const onSubmitForm = async (e) => {
    //   Dont want it to refresh
    e.preventDefault();
    try {
      const body = { description };
      const res = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">Input Todo</h1>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="add todo"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;

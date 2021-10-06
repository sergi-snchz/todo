import React, { useState, useContext } from 'react';

import todosFinder from '../apis/todos';
import { TodoContext } from '../context/TodoContext';

function AddTodo() {
  const { addTodo, isModalOpen } = useContext(TodoContext);
  const [todo, setTodo] = useState("");

  // Event listeners
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await todosFinder.post("", {
        description: todo
      })
      addTodo(response.data.todo[0]);
      e.target.children[0].value = '';
    } catch (err) {
      console.error(err.message);
    }
  }
  let formClasses = "w-11/12 max-w-xl mx-auto flex justify-between";
  if (isModalOpen) {
    formClasses += " opacity-40";
  }
  return (
    <form className={formClasses} onSubmit={handleSubmit}>
      <input autoFocus className="border rounded border-blue-500 focus:outline-none focus:ring-1 focus:border-blue-300 p-2 w-3/4 text-gray-700" placeholder="Add Todo" onChange={e => setTodo(e.target.value)} disabled={isModalOpen} />
      <button className="bg-blue-500 text-gray-100 ml-3 p-2 rounded hover:bg-blue-600" type="submit" disabled={isModalOpen || !todo}>Add</button>
    </form>
  );
}

export default AddTodo;

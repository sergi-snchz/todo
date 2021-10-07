import React, { useEffect, useContext, useState } from 'react';
import { MdClose } from 'react-icons/md';

import todosFinder from '../apis/todos';
import { TodoContext } from '../context/TodoContext';

function GetTodos() {
  const [editPlaceholder, setEditPlaceholder] = useState('');
  const [todoEdited, setTodoEdited] = useState('');
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const { todos, setTodos, isModalOpen, setIsModalOpen } = useContext(TodoContext);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await todosFinder.get('');
        setTodos(response.data.todos);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  async function deleteTodo(id) {
    try {
      const response = await todosFinder.delete(`${id}`);
      const updatedTodoArr = todos.filter(todo => todo.id !== response.data.todo[0].id);
      setTodos(updatedTodoArr);
    } catch (err) {
      console.error(err.message);
    }
  }

  function handleEdit(description, id) {
    setIsModalOpen(!isModalOpen);
    setEditPlaceholder(description);
    setCurrentTodoId(id);
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    try {
      await todosFinder.put(`${currentTodoId}`, {
        description: todoEdited
      });
      const updatedTodoArr = todos.map(todo => {
        if (todo.id !== currentTodoId) {
          return todo;
        } else {
          return { id: todo.id, description: todoEdited };
        }
      });
      setTodos(updatedTodoArr);
      setIsModalOpen(!isModalOpen);
      e.target[0].value = '';
    } catch (err) {
      console.error(err.message);
    }
  }

  async function deleteAll() {
    try {
      await todosFinder.delete('');
      setTodos([]);
    } catch (err) {
      console.error(err.message);
    }
  }
  let todosHeader = 'flex justify-between mb-5 items-center max-w-xl mx-auto w-11/12 sm:w-full';
  if (isModalOpen) {
    todosHeader += ' opacity-40';
  }
  // let modalClasses = 'w-5/6 h-60 bg-gray-300 rounded flex flex-col justify-between relative bottom-72 mx-auto max-w-xl';
  let modalClasses = 'fixed top-20 w-full bg-gray-300 max-w-xl max-h-60 rounded'
  if (!isModalOpen) {
    modalClasses += ' hidden';
  }
  return (
    <div className="mt-5 mx-auto max-w-xl">
      <div className={todosHeader}>
        <h2>TODOS</h2>
        <button className="bg-red-600 rounded p-2 text-xs text-gray-100 hover:bg-red-700" onClick={deleteAll} disabled={isModalOpen}>Delete All</button>
      </div>
      {todos.map((todo, index) => {
        let classes = "flex justify-around text-sm gap-3 items-center hover:bg-gray-400 cursor-pointer mx-auto w-11/12 sm:w-full";
        if (index % 2 === 0) {
          classes += " bg-gray-200";
        } else {
          classes += " bg-gray-300";
        }
        if (isModalOpen) {
          classes += ' opacity-40';
        }
        return (
          <div className={classes} key={todo.id}>
            <p className="ml-4 w-1/2">{todo.description}</p>
            <button className="bg-yellow-400 rounded p-2 text-xs text-gray-100 my-2 hover:bg-yellow-500" onClick={() => handleEdit(todo.description, todo.id)} disabled={isModalOpen}>Edit</button>
            <button className="bg-red-600 rounded p-2 text-xs text-gray-100 hover:bg-red-700" onClick={() => deleteTodo(todo.id)} disabled={isModalOpen}>Delete</button>
          </div>
        );
      })}
      <div className={modalClasses}>
        <div className="flex justify-end">
          <MdClose className="text-2xl text-red-600 cursor-pointer hover:text-red-700 m-2" onClick={() => setIsModalOpen(!isModalOpen)}/>
        </div>
        <form className="mx-3 my-8 flex justify-between" onSubmit={handleEditSubmit}>
          <input className="border rounded border-blue-500 focus:outline-none focus:ring-1 focus:border-blue-300 p-2 w-3/4 text-gray-700" placeholder={editPlaceholder} onChange={(e) => setTodoEdited(e.target.value)} />
          <button className="bg-blue-500 text-gray-100 ml-3 p-2 rounded hover:bg-blue-600" type="submit">Edit</button>
        </form>
      </div>
    </div>
  );
}

export default GetTodos;

import React, { useState, createContext } from 'react';

export const TodoContext = createContext();

export function TodoContextProvider(props) {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  function addTodo(todo) {
    setTodos([...todos, todo]);
  }
  return (
    <TodoContext.Provider value={{ todos, setTodos, addTodo, isModalOpen, setIsModalOpen }} >
      {props.children}
    </TodoContext.Provider>
  );
}

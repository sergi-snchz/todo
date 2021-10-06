import React from 'react';

import AddTodo from './AddTodo';
import GetTodos from './GetTodos';
import { TodoContextProvider } from '../context/TodoContext';

function App() {
  return (
    <TodoContextProvider>
      <div className="mt-5 w-11/12 mx-auto sm:mt-10 max-w-2xl">
        <AddTodo />
        <GetTodos />
      </div>
    </TodoContextProvider>
  );
}

export default App;

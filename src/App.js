import './App.css';
import React, {useState} from 'react';

import { TodoCounter } from './Components/TodoCounter';
import { TodoSearch } from './Components/TodoSearch';
import { TodoList } from './Components/TodoList';
import { TodoItem } from './Components/TodoItem';
import { CreateTodoButton } from './Components/CreateTodoButton';

const todosList = [
  { id: '1', text: 'Bake cupcakes', completed: false },
  { id: '2', text: 'Prepare hot chocolate', completed: true },
  { id: '3', text: 'Prepare popcorn', completed: false },
]

function App() {
  const todos = todosList;
  const [listTodos, setTodos] = useState(todos);

  const completedTodos = listTodos.filter(todo => todo.completed).length;
  const totalTodos = listTodos.length;


  const filterTodos = (word) => {
    // if word '' return all todos
    if (word === '' || word === null) setTodos(todos);

    // filter todos that includes word in text
    setTodos(todos.filter(todo => todo.text.toLowerCase().includes(word)));
  }

  const completeTodos = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);

    const newTodos = [...todos];
    
    newTodos[todoIndex].completed = true;
    setTodos(newTodos);
  }

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  }
  
  return (
    <>
      <div className='TodoAppContainer'>
        <TodoCounter
          total={totalTodos}
          completed={completedTodos}
        />

        <TodoSearch onWrite={filterTodos}/>
        
        <TodoList>
          {listTodos.map(todo => (
            <TodoItem key={todo.text} text={todo.text} completed={todo.completed} onComplete={completeTodos} onDelete={deleteTodo} />
          ))}
        </TodoList>

        <CreateTodoButton />
      </div>
    </>
  );
}

export default App;

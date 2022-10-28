import React, {useEffect, useState} from 'react';
import {DragDropContext, DropResult} from '@hello-pangea/dnd';

import './App.css';

import InputField from "./components/InputField";
import {Todo} from "./model";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  
  useEffect(()=>{
    const activeTodos = JSON.parse(localStorage.getItem('active-todos') || "[]");
    const completedTodos = JSON.parse(localStorage.getItem('completed-todos') || "[]");
    
    if (activeTodos.length > 0) {
       setTodos(activeTodos);
    }
    
    if (completedTodos.length > 0) {
      setCompletedTodos(completedTodos);
    }
  },[]);
  
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (todo) {
      setTodos([...todos, {id: Date.now(), todo, isDone: false}]);
      setTodo("");
    }
  };
  
  const onDragEnd = (result:DropResult) => {
    const {source, destination} = result;
    
    if (!destination) return;
    
    if (destination.index === source.index && destination.droppableId === source.droppableId) return;
    
    let add, active = todos, complete = completedTodos;
    
    if(source.droppableId === 'TodosList'){
      add = active[source.index];
      active.splice(source.index, 1);
    }else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
  
    if(destination.droppableId === 'TodosList'){
      active.splice(destination.index, 0, add);
    }else {
      complete.splice(destination.index, 0, add);
    }
    
    setCompletedTodos(complete);
    setTodos(active);
    localStorage.setItem('completed-todos', JSON.stringify(complete));
    localStorage.setItem('active-todos', JSON.stringify(active));
  }
  
  useEffect(()=>{
    localStorage.setItem('active-todos', JSON.stringify(todos));
  },[todos]);
  
  useEffect(()=>{
    localStorage.setItem('completed-todos', JSON.stringify(completedTodos));
  },[completedTodos]);
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className='heading'>TASKIFY</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
}

export default App;

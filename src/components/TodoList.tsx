import React from 'react';

import "./style.css";
import {Todo} from "../model";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({todos, setTodos}) => {
  return (
    <div className="container">
      <div className="todos">
        <span className="todos__heading">
          Active Tasks
        </span>
          {todos.map((t) => (
            <SingleTodo
              todo={t}
              key={t.id}
              todos={todos}
              setTodos={setTodos}
            />
          ))}
      </div>
      <div className="todos removed">
         <span className="todos__heading">
          Completed Tasks
        </span>
        {todos.map((t) => (
          <SingleTodo
            todo={t}
            key={t.id}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
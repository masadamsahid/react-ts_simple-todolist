import React from 'react';

import "./style.css";
import {Todo} from "../model";
import SingleTodo from "./SingleTodo";
import {Droppable} from "@hello-pangea/dnd";

interface Props {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  completedTodos: Todo[],
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}

const TodoList: React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? 'drag-active' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">
              Active Tasks
            </span>
            {todos.map((t, idx) => (
              <SingleTodo
                index={idx}
                todo={t}
                key={t.id}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemoved">
        {(provided, snapshot) => (
          <div
            className={`todos removed ${snapshot.isDraggingOver ? 'drag-complete' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">
              Completed Tasks
            </span>
            {completedTodos.map((t, idx) => (
              <SingleTodo
                index={idx}
                todo={t}
                key={t.id}
                todos={completedTodos}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
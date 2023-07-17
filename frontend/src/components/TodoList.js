import React from "react";
import TodoItem from "./TodoItem"
import { useState, useEffect } from "react";

export default function TodoList(props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    setTodos(props.todos)
  }, [props.todos]);

  function handleActive(index) {
    setActiveIndex(index);
  }

  function handleDelete(index) {
    props.handleDeleteTodo(todos[index]._id);
    setTodos((prevTodo) => {
      // caution
      const aux = [...prevTodo]
      aux.splice(index, 1);
      return aux;
    });
  }

  function renderTodos(todos) {
    return (
      <ul className="list-group">
        {todos.map((todo, i) => (
          <TodoItem 
            key={i}
            onClick={() => {
              handleActive(i);
            }}
            onDelete={() => {
              handleDelete(i);
            }}
            text={todo.text}
            active={i===activeIndex}
          />
        ))}
      </ul>
    );
  }



  return (
    todos.length > 0 ? (
      renderTodos(todos)
    ) : (
      <div className="alert alert-primary" role="alert">
        No Todos to display
      </div>
    )
  )
}
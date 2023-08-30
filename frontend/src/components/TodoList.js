import React from "react";
import TodoItem from "./TodoItem"
import { useState } from "react";
import { ListGroup } from "react-bootstrap";

export default function TodoList(props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const { todos, setTodos } = props;


  function handleActive(index) {
    setActiveIndex(index);
  }

  async function handleDelete(index) {
    await props.handleDeleteTodo(todos[index]._id)
    setTodos((prevTodo) => {
        // caution
        const aux = [...prevTodo]
        aux.splice(index, 1);
        return [...aux];
      });
  }
  
  function handleEdit(index) {
    props.handleEditTodo(todos[index]);
  }

  function renderTodos(todos) {
    return (
      <ListGroup variant="warning">
        {todos.map((todo, i) => (
          <TodoItem 
            key={i}
            i={i}
            onClick={() => {
              handleActive(i);
            }}
            onDelete={async () => {
              await handleDelete(i);
            }}
            onEdit={() => {
              handleEdit(i);
            }}
            text={todo.text}
            active={i===activeIndex}
          />
        ))}
      </ListGroup>
    );
  }

  return (
    todos.length > 0 ? (
      renderTodos(todos)
    ) : (
      <div className="alert alert-warning" role="alert">
        No Todos to display
      </div>
    )
  )
}

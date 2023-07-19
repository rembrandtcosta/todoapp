import React from "react";
import { Button } from "react-bootstrap"; 

export default function AddTodo(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target.elements.value;
    if (value.length > 0) {
      props.handleAddTodo(value);
      e.target.reset();
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="new-todo form-group"
    >
      <input
        type="text"
        name="value"
        required
        minLength={1}
        className="form-control"
      />
      <Button 
        className="btn btn-primary" 
        variant="warning"
        type="submit"
       >
        Add
      </Button>
    </form>
  );
}

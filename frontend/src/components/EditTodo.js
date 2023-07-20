import React from "react";
import { Button } from "react-bootstrap"; 

export default function EditTodo(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target.elements.value;
    if (value.length > 0) {
      props.item.text = value;
      props.handleEditTodo(props.item);
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
        defaultValue={props.item.text}
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
        Save
      </Button>
    </form>
  );
}

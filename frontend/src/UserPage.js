import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react"; 
import { useEffect } from "react";
import axios from "axios";
import "./App.scss";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
  const history = useNavigate();
  const user = localStorage.getItem("user");
  const [todos, setTodos] = useState([]);

  console.log(todos);

  useEffect(() => {
    axios
      .get("/api/", 
           { params: { user: user }, 
             headers: { Authorization: localStorage.getItem("token"), } 
           })
      .then((response) => {
        setTodos(
          response.data.data,
        );
      })
      .catch((e) => console.log("Error : ", e));
  }, []);

  const handleAddTodo = (value) => {
    axios
      .post("/api/todos/", 
            { text: value,
              user: user}, 
            { headers: {
                Authorization: localStorage.getItem("token"), 
              } 
            }
        )
      .then(() => {
        setTodos(
          [...todos, { text: value }],
        );
      })
      .catch((e) => console.log("Error : ", e));
  };

  const handleDeleteTodo = (value) => {
    axios
      .delete("/api/todos", 
              { data: { _id: value }, 
                headers: { Authorization: localStorage.getItem("token")} 
              })
      .catch((e) => console.log("Error : ", e));
  }; 

  const logoutOnClick = () => {
    localStorage.clear();
    history("/login");
  }

  return (
    <div className="App container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-md-8 offset-md-2">
            <h1>Todos</h1>
            <div className="todo-app">
              <AddTodo handleAddTodo={handleAddTodo} />
              <TodoList 
                todos={todos}
                handleDeleteTodo={handleDeleteTodo}
              />
              <Button onClick={logoutOnClick}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
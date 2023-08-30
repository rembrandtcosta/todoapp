import React from "react";
import { Button, NavbarBrand } from "react-bootstrap";
import { useState } from "react"; 
import { useEffect } from "react";
import axios from "axios";
import "./App.scss";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { useNavigate } from "react-router-dom";
import { Navbar } from "react-bootstrap"; 
import EditTodo from "./components/EditTodo";

export default function UserPage() {
  const history = useNavigate();
  const user = localStorage.getItem("user");
  const [todos, setTodos] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    await axios
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
  };

  const handleAddTodo = async (value) => {
    await axios
      .post("/api/todos/", 
            { text: value,
              user: user}, 
            { headers: {
                Authorization: localStorage.getItem("token"), 
              } 
            }
        )
      .then(() => {
        fetchTodos();
      })
      .catch((e) => console.log("Error : ", e));
  };

  const handleDeleteTodo = async (value) => {
    await axios
      .delete("/api/todos", {
            data: { 
              _id: value,
            },
            headers: {
                Authorization: localStorage.getItem("token"), 
            } 
      })
  }; 


  const handleEditTodo = (value) => {
    if (isEditMode) {
      console.log(value);
      setIsEditMode(false);
      axios
        .put("/api/todos", 
            {data: { 
              todo: value,
            }},
            {headers: {
                Authorization: localStorage.getItem("token"), 
            }} 
      ).catch((e) => console.log("Error: ", e));
    } else {
      setEditItem(value);
      setIsEditMode(true);
    }
  };

  const logoutOnClick = () => {
    localStorage.clear();
    history("/login");
  }

  return (
    <React.Fragment>
    <div>
      <Navbar 
        className="bg-body-tertiary" 
        expand="lg"
      > 
        <NavbarBrand href="/"><h1>✍To-do</h1></NavbarBrand>
        <Button 
          className="logout-button"
          variant="warning"
          onClick={logoutOnClick}
        >
          Logout
        </Button>
      </Navbar>
    </div>
    <hr />    
    <div className="App container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-md-8 offset-md-2">
                      <div className="todo-app">
              { !isEditMode ?
                (<AddTodo 
                  handleAddTodo={handleAddTodo} 
                />)
                : 
                (<EditTodo
                  item={editItem}
                  handleEditTodo={handleEditTodo}
                />)
              }
              <TodoList 
                todos={todos}
                setTodos={setTodos}
                handleDeleteTodo={handleDeleteTodo}
                handleEditTodo={handleEditTodo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
}

import React from "react";
import { useState } from "react";
import axios from "axios";
import { Button, Form, Navbar, NavbarBrand } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LoginForm.scss";


function LoginForm(){
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/login", { username, password});
      localStorage.setItem("user", username);
      localStorage.setItem("token", response.data.token);
      history("/");
    } catch (error) {
      console.error(error);
    }
  };

  const signupOnClick = () => {
    history("/signup");
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
          onClick={signupOnClick}
        >
          Signup
        </Button>
      </Navbar>
    </div>
    <hr />    
    <div className="App container">
      <div className="container-fluid">
        <div className="row all-container">
          <div className="col-xs-12 col-sm-8 col-md-4 offset-md-4 login-container">
            <h1> Login </h1>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
            <Form.Control
              className="container-element"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
            <Form.Control
              className="container-element"   
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            </Form.Group>

            <Button 
              className="container-element" 
              variant="warning"
              type="submit"
            >
              Login
            </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>

    </React.Fragment>
  );
}

export default LoginForm;

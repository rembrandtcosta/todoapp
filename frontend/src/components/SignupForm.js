import React from "react";
import { useState } from "react";
import axios from "axios";
import { Button, Form, Navbar, NavbarBrand } from "react-bootstrap";
import { useNavigate } from "react-router-dom"


function SignupForm(){
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/signup", { username, password});
      localStorage.setItem("token", response.data.token);
      history("/");
    } catch (error) {
      console.error(error);
    }
  };

  const loginOnClick = () => {
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
          onClick={loginOnClick}
        >
          Login
        </Button>
      </Navbar>
    </div>
    <hr />    
    <div className="App container">
      <div className="container-fluid">
        <div className="row all-container">
          <div className="col-xs-12 col-sm-8 col-md-8 offset-md-2 login-container">
            <h1> Signup </h1>
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
                  type="text"
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPasswordConf">
                <Form.Control
                  className="container-element"
                  type="text"
                  placeholder="Confirm password"
                  value={passwordConf}
                  onChange={(event) => setPasswordConf(event.target.value)}
                />
              </Form.Group>
              <Button className="container-element" variant="warning" type="submit">
                Signup
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
}

export default SignupForm;

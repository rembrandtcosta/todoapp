import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import UserPage from "./UserPage";
import { PrivateRoute } from "./PrivateRoute";
import { Container } from "react-bootstrap";
import SignupForm from "./components/SignupForm";

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<PrivateRoute Component={UserPage} />} />
      </Routes>
    </Router>
  );
}

const express = require("express");
const jwt = require("jsonwebtoken");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const auth = require("../config/auth");
const { Todo } = require("../models/todos/todo");
const authenticateJWT = require("../middlewares/auth");
const User = require("../models/todos/user");

const routes = (app) => {
  const router = express.Router();

  router.post("/signup", (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });

    user.save((err) => {
      if (err){
        return res.status(400).send(err);
      }

      const token = jwt.sign({ userId: user._id }, auth.secret);
      res.json({token});
    });
  });

  router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username }, (err, user) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!user){
        return res.status(404).send("User not found"); 
      }

      user.comparePassword(password, (err, isMatch) => {
        if (err){
          return res.status(500).send(err);
        }

        if (!isMatch){
          return res.status(401).send("Incorrect password");
        }

        const token = jwt.sign({userId: user._id}, auth.secret);
        res.json({token});
      });
    });
  });

  router.post("/todos", authenticateJWT, (req, res) => {
    const todo = new Todo({
      text: req.body.text,
      user: req.body.user,
    });

    todo
      .save()
      .then((result) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  router.delete("/todos", authenticateJWT, (req, res) => {
    const todo = {
      _id: req.body._id
    };

    Todo
      .remove(todo)
      .then((result) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  router.get("/", authenticateJWT, (req, res) => {
    const username = {
      user: req.query.user
    }

    console.log(username);

    Todo.find( username )
      .then((todos) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, todos);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  //it's a prefix before api it is useful when you have many modules and you want to
  //differentiate b/w each module you can use this technique
  app.use("/api", router);
};
module.exports = routes;

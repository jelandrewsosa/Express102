import express from "express";
import CheckIfUsersIsEmpty from "./middleware/CheckIfUsersIsEmpty.js";
import CheckIfValidEmail from "./middleware/CheckIfValidEmail.js";
import CheckIfEmailExist from "./middleware/CheckIfEmailExist.js";
import CreateUser from "./middleware/CreateUser.js";

const app = express();
const port = 3000;

app.use(express.json());

const users = [];

const setUsersInfo = (users) => {
  
  return (req, res, next) => {
    req.requestUsersInfo = users;
    next();
  };
};

app.get("/", (req, res) => {

  return res.send("Hello World!");
});

app.get("/users", setUsersInfo(users), CheckIfUsersIsEmpty, (req, res) => {

  return res.status(200).json(req.requestUsersInfo);
});

app.post("/users", setUsersInfo(users), CheckIfValidEmail, CheckIfEmailExist, CreateUser, (req, res) => {
});

app.listen(port, () => {
  console.log(`Server is Listening on port ${port}`);
});

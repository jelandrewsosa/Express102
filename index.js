import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

const users = [];

app.get("/", (req, res) => {
  
  return res.send("Hello World!");
});

app.get("/users", (req, res) => {
  if (users.length === 0) {
    return res.status(400).json({
      error: "Users is Empty",
    });
  } else {
    return res.status(200).json(users);
  }
});

app.post("/users", (req, res) => {
  const details = req.body;
  const email = req.body.email;

  if (!email.includes("@")) {

    return res.status(422).json({
      error: "Email Address is Invalid",
    });
  } else {
    const findUser = users.find((user) => user.email === email);

    if (findUser) {

      return res.status(422).json({
        error: "Email Address already exist",
      });
    } else {
      const filteredDetails = Object.fromEntries(
        Object.entries(details).filter(
          ([key]) =>
            key.includes("firstName") ||
            key.includes("lastName") ||
            key.includes("email")
        )
      );
      const newUser = {
        id: users.length + 1,
        ...filteredDetails,
      };
      users.push(newUser);

      return res.status(201).json(newUser);
    }
  }
});

app.listen(port, () => {
  console.log(`Server is Listening on port ${port}`);
});

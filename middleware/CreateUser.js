export default function CreateUser(req, res, next) {
  const details = req.body;
  const users = req.requestUsersInfo;
  
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


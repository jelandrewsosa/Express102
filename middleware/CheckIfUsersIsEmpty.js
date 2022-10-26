export default function CheckIfUsersIsEmpty(req, res, next) {
  const users = req.requestUsersInfo;
  
  if (users.length === 0) {
    
    return res.status(400).json({
      error: "Users is Empty",
    });
  }
  next();
}
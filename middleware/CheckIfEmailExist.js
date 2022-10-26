export default function CheckIfEmailExist(req, res, next) {
  const {email} = req.body;
  const users = req.requestUsersInfo;
  
  const findEmail = users.find((user) => user.email === email);

    if (findEmail) {

      return res.status(422).json({
        error: "Email Address already exist",
      });
    }
  next();
}


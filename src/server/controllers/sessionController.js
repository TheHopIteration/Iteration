const db = require("../models/dataModels");
const bcrypt = require("bcrypt");

const sessionController = {};

sessionController.verifyUser = async (req, res, next) => {
  if (!res.locals.getUser) {
    return next({
      log: "Invalid username",
      status: 402,
      message: { err: "Invalid username" },
    });
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) return next("Both fields required to login");

    const sqlQuery = `
            SELECT password
            FROM users
            WHERE username = $1
            ;`;

    let retrievedPassword;
    await db.query(sqlQuery, [username]).then((data) => {
      retrievedPassword = data.rows[0].password;
    });

    let verification = bcrypt.compareSync(password, retrievedPassword);

    if (verification) {
      req.session.authenticated = true;
      req.session.user = res.locals.getUser;
      console.log(username + " logged in");
      console.log(req.session);
      return next();
    } else
      return next({
        log: "Invalid password",
        status: 402,
        message: { err: "Invalid password" },
      });
  } catch (err) {
    return next({
      log: `Error in userController.verifyUser : ${err}`,
      message: { err: "Error occurred in userController.verifyUser" },
    });
  }
};

sessionController.logout = async (req, res, next) => {
  if (!req.session.user.username)
    return next({ log: "Not logged in", message: "Not logged in" });

  const logoutHelper = () => {
    const username = req.session.user.username;
    
    res.clearCookie("userID", { path: "/" });
    res.clearCookie("connect.sid", { path: "/" });
    req.session.authenticated = false;
    
    return req.session.destroy((err) => {
      if(err){
        return next({
          log: "Error destroying session: "+ err,
          message: {err: "Error destroying session"}
        })
      }
      res.clearCookie("userID", { path: "/" });
      res.clearCookie("connect.sid", { path: "/" });
      return next();
    });
  };

  await logoutHelper();
};

module.exports = sessionController;

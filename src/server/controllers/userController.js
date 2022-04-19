const db = require("../models/dataModels");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const userController = {};

// if no id exists in the fetch url (/:id), then use req.body
userController.getUser = async (req, res, next) => {
  try {
    const username = req.params.id ? req.params.id : req.body.username;

    if (!username) {
      return next("Missing username in userController.getUser");
    }

    const sqlQuery = `
          SELECT userid, username, email, home_location, first_name, last_name FROM users 
          WHERE username = $1
          `;

    const params = [username];

    const data = await db.query(sqlQuery, params);

    res.locals.getUser = data.rows[0] ? data.rows[0] : null;
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.getUser : ${err}`,
      message: { err: "Error occurred in userController.getUser" },
    });
  }
};

userController.getAllUsers = async (req, res, next) => {
  try {
    const sqlQuery = `SELECT username, email, home_location FROM users`;
    const data = await db.query(sqlQuery);

    res.locals.getAllUsers = data.rows;
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.getAllUsers : ${err}`,
      message: { err: "Error occurred in userController.getAllUsers" },
    });
  }
};

userController.createUser = async (req, res, next) => {
  if (res.locals.getUser) {
    return next({
      log: `Error in userController.createUser`,
      message: { err: "This username is already in use." },
      status: 401,
    });
  }
  try {
    const { username, password, email } = req.body;

    if (!username || !password) {
      return next("Missing username or password in userController.createUser");
    }
    const sqlQuery = !email
      ? `
        INSERT INTO users (username, password)
        VALUES ($1, $2) ON CONFLICT DO NOTHING
        RETURNING userid, username, email, home_location
            `
      : `
        INSERT INTO users (username, password, email)
        VALUES ($1, $2, $3) ON CONFLICT DO NOTHING
        RETURNING userid, username, email, home_location
            `;

    let salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    let hash = bcrypt.hashSync(password, salt);

    const params = !email ? [username, hash] : [username, hash, email];

    const data = await db.query(sqlQuery, params);
    res.locals.createUser = data.rows[0];
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.createUser : ${err}`,
      message: { err: "Error occurred in userController.createUser" },
    });
  }
};

userController.updateUser = async (req, res, next) => {
  try {
    const { email, firstName, lastName, homeLocation } = req.body;
    const allUserData = { email: email, first_name: firstName, last_name: lastName, home_location: homeLocation };
    let searchArray = [];
    for (let property in allUserData) {
      let updateQuery = `
         UPDATE users
         SET ${property} = $1
         WHERE userid = $2
      `
      let params = [allUserData[property], req.params.id]
      searchArray.push(db.query(updateQuery, params))
    }
    await Promise.all(searchArray);
    return next();
  }
  catch (err) {
    return next({
      log: `Error in userController.updateUser : ${err}`,
      message: { err: "Error occurred in userController.updateUser" },
    });
  }
};

// if no id exists in the fetch url (/:id), then use req.body
userController.deleteUser = async (req, res, next) => {
  try {
    const username = req.params.id ? req.params.id : req.body.username;
    const sqlQuery = `
            DELETE
            FROM users
            WHERE username = $1
            ;`;

    const params = [username];
    const deletedUser = await db.query(sqlQuery, params);

    if (deletedUser.rowCount < 1) {
      return next({
        message: "This user does not exist",
        log: "This user does not exist",
      });
    }

    return next();
  } catch (err) {
    return next({
      log: `Error in userController.deleteUser : ${err}`,
      message: { err: "Error occurred in userController.deleteUser" },
    });
  }
};

module.exports = userController;

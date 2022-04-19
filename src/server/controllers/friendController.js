const db = require("../models/dataModels");

const friendController = {};

friendController.getFriends = async (req, res, next) => {
    //get all fields for all friends where provided userID is the listed user_A

    //req.body.userid must be present
    try {
      const userid = req.query.userid;
      const sqlQuery = `
        SELECT *
        FROM friends AS f
        LEFT JOIN users AS u f ON f.friendID = u.userid
        WHERE user_A = $1
      ;`;

      const params = [userid];
      const data = await db.query(sqlQuery, params);
      res.locals.savedFriends = data.rows;
      return next();

    } catch (err) {
        return next({
            log: `Error in friendController.getFriends : ${err}`,
            message: { err: "Error occurred in friendController.getFriends" },
        });
    }
  };



module.exports = friendController;

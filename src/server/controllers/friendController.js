const db = require("../models/dataModels");

const friendController = {};

friendController.getFriends = async (req, res, next) => {
    //get all fields for all friends where provided userID is the listed user_A

    try {
      const { username } = req.query;
      const sqlQuery = `
        SELECT friend_b
        FROM friends AS f
        LEFT JOIN users AS u ON f.friend_a = u.username
        WHERE friend_a = $1
      ;`;

      const params = [username];
      const data = await db.query(sqlQuery, params);
      console.log(`CURRENT FRIENDS OF ${username} ARE: ${JSON.stringify(data.rows)}`)
      res.locals.savedFriends = data.rows;
      return next();

    } catch (err) {
        return next({
            log: `Error in friendController.getFriends : ${err}`,
            message: { err: "Error occurred in friendController.getFriends" },
        });
    }
  };


friendController.addFriend = async (req, res, next) => {
  //add a new friend as friendB where current user will be friendA. If requested friend username does not exist, return failure


  try {
    const { userA, userB } = req.body;
    console.log(`BODY: ${JSON.stringify(req.body)}`);
    const sqlQuery = `
      INSERT INTO friends (friend_a, friend_b)
      VALUES ($1, $2) ON CONFLICT DO NOTHING
    `;
    const params = [userA, userB];
    if (!userA || !userB) console.log('NO USERS!')
    const data = await db.query(sqlQuery, params);
    console.log(`RESULT: ${JSON.stringify(data.rows)}`)
    res.locals.newFriend = data.rows[0];
    return next();

  } catch (err) {
    return next({
      log: `Error in friendController.addFriend : ${err}`,
      message: { err: "Error occured in friendController.addFriend" },
    });
  }
};


module.exports = friendController;

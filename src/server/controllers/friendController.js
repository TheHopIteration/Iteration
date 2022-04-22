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
      RETURNING friend_b
    `;
    const params = [userA, userB];
    if (!userA || !userB) console.log('NO USERS!')
    const data = await db.query(sqlQuery, params);
    res.locals.newFriend = data.rows[0];
    return next();

  } catch (err) {
    return next({
      log: `Error in friendController.addFriend : ${err}`,
      message: { err: "Error occured in friendController.addFriend" },
    });
  }
};

friendController.removeFriend = async (req, res, next) => {
  //remove friend where friendB is friend to be removed (body.userB) from userA's page (body.userA)

  try {
    const { userA, userB } = req.body;
    const sqlQuery = `
      DELETE FROM friends *
      WHERE friend_a = $1 AND friend_b = $2
      RETURNING friend_b
    `;
    const params = [userA, userB];

    const data = await db.query(sqlQuery, params);
    res.locals.removedFriend = data.rows[0];
    return next();

  } catch (err) {
    return next({
      log: `Error in friendController.removeFriend : ${err}`,
      message: { err: "Error occured in friendController.removeFriend" },
    });   
  }
}


module.exports = friendController;

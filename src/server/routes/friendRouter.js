const express = require('express');

const friendController = require('../controllers/friendController');

const router = express.Router();


router.get('/',
    friendController.getFriends,
    (req, res, next) => {
        return res.status(200).json(res.locals.savedFriends);
    });

// router.post('/',
//     friendController.saveFriend,
//     (req, res, next) => {
//         return res.status(200).json(res.locals.savedFriend);
//     });


module.exports = router;
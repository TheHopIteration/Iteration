const { RouterTwoTone } = require('@mui/icons-material');
const express = require('express');

const friendController = require('../controllers/friendController');

const router = express.Router();


router.get('/',
    friendController.getFriends,
    (req, res, next) => {
        return res.status(200).json(res.locals.savedFriends);
    });

router.post('/',
    friendController.addFriend,
    (req, res, next) => {
        return res.status(200).json(res.locals.newFriend);
    });

router.delete('/',
    friendController.removeFriend,
    (req, res, next) => {
        return res.status(200).json(res.locals.removedFriend);
    });


module.exports = router;
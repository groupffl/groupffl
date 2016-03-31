const express = require('express');
const router = express.Router();

router.use('/comment', require('./comment'));
router.use('/league', require('./league'));
router.use('/post', require('./post'));
router.use('/team', require('./team'));
router.use('/user', require('./user'));
router.use('/feed', require('./feed'));

module.exports = router;

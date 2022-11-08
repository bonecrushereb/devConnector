const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//@route   GET api/auth
//@access  Public
router.get('/', auth, (req, res) => res.send('auth Route'));

module.exports = router
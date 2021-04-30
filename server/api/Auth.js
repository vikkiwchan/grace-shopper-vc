const {
  models: { User },
} = require('../db/index');
const router = require('express').Router();

// POST /api/auth
// client sends credentials as a payload to this route
// server returns a token, a string that can't be manipulated & will identify user
router.post('/', async (req, res, next) => {
  try {
    const token = await User.authenticate(req.body);
    res.send(token);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

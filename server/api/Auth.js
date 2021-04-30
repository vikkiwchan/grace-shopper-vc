const {
  models: { User },
} = require('../db/index');
const router = require('express').Router();

// POST /api/auth
// client sends credentials as a payload to this route
router.post('/api/auth', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const router = require('express').Router();
const apiRoutes = require('./api');

// routes in inside apiRoutes will be preceded by /api
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;
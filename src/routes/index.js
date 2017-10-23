// src/routes/index.js
const router = require('express').Router();

// documentation route
router.use('/doc', function(req, res, next) {
  res.end(`Documentation https://techgladiator.github.io/comic-collection`);
});

module.exports = router;
// src/routes/index.js
const router = require('express').Router();

// documentation route
router.use('/doc', function(req, res, next) {
  res.end(`Documentation https://techgladiator.github.io/comic-collection`);
});

router.get('/file', function(req, res, next) {
  res.end('List all files');
});

router.post('/file', function(req, res, next) {
  res.end('Create a new file');
});

router.put('/file/:fileId', function(req, res, next) {
  res.end(`Updating file '${req.params.fileId}'`);
});

router.delete('/file/:fileId', function(req, res, next) {
  res.end(`Deleting file '${req.params.fileId}'`);
});

router.get('/file/:fileId', function(req, res, next) {
  res.end(`Reading file '${req.params.fileId}'`);
});

module.exports = router;
// src/routes/index.js
const router = require('express').Router();

const FILES = [
  {id: '1', issue: '#7', coverDate: 'March, 1963'},
  {id: '2', issue: '#8', coverDate: 'May, 1963'},
  {id: '3', issue: '#9', coverDate: 'July, 1963'},
  {id: '4', issue: '#10', coverDate: 'Sept, 1963'},
];

// documentation route
router.use('/doc', function(req, res, next) {
  res.end(`Documentation https://techgladiator.github.io/comic-collection`);
});

router.get('/file', function(req, res, next) {
  res.json(FILES);
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
// src/routes/index.js
const router = require('express').Router();

const FILES = [
  {id: '1', series: 'The Incredible Hulk', volume: '1962', issue: '#1', coverDate: 'May, 1962'},
  {id: '2', series: 'The Incredible Hulk', volume: '1962', issue: '#2', coverDate: 'July, 1962'},
  {id: '3', series: 'The Incredible Hulk', volume: '1962', issue: '#3', coverDate: 'August, 1962'},
  {id: '4', series: 'The Incredible Hulk', volume: '1962', issue: '#4', coverDate: 'October, 1962'},
  {id: '5', series: 'The Incredible Hulk', volume: '1962', issue: '#5', coverDate: 'December, 1962'},
  {id: '6', series: 'The Incredible Hulk', volume: '1962', issue: '#6', coverDate: 'January, 1963'}
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
  const {fileId} = req.params;

  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  res.json(file);
});

module.exports = router;
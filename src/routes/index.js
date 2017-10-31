// src/routes/index.js
const router = require('express').Router();
const mongoose = require('mongoose');

const FILES = [
  {series: 'The Incredible Hulk', volume: '1962', issue: '#1', coverDate: 'May, 1962', id: '0'},
  {series: 'The Incredible Hulk', volume: '1962', issue: '#2', coverDate: 'July, 1962', id: '1'},
  {series: 'The Incredible Hulk', volume: '1962', issue: '#3', coverDate: 'August, 1962', id: '2'},
  {series: 'The Incredible Hulk', volume: '1962', issue: '#4', coverDate: 'October, 1962', id: '3'},
  {series: 'The Incredible Hulk', volume: '1962', issue: '#5', coverDate: 'December, 1962', id: '4'},
  {series: 'The Incredible Hulk', volume: '1962', issue: '#6', coverDate: 'January, 1963', id: '5'}
];

// documentation route
router.use('/doc', function(req, res, next) {
  res.end(`Documentation https://techgladiator.github.io/comic-collection`);
});

// find files and add to response
router.get('/file', function(req, res, next) {
  mongoose.model('File').find({}, function(err, files) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  
    res.json(files);
  });
});

// collect POST data from form and create new file
router.post('/file', function(req, res, next) {
  const File = mongoose.model('File');
  const fileData = {
    series: req.body.series,
    volume: req.body.volume,
    issue: req.body.issue,
    coverDate: req.body.coverDate,
  };

  File.create(fileData, function(err, newFile) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(newFile);
  });
});

router.put('/file/:fileId', function(req, res, next) {
  const {fileId} = req.params;
  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  file.series = req.body.series;
  file.volume = req.body.volume;
  file.issue = req.body.issue;
  file.coverDate = req.body.coverDate;
  res.json(file);
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
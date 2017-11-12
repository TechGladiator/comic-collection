// src/routes/index.js
const router = require('express').Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// find files and add to response
router.get('/file', function(req, res, next) {
  mongoose.model('File').find({deleted: {$ne: true}}, function(err, files) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  
    res.json(files);
  });
});

// find files and add to response
router.get('/deleted', function(req, res, next) {
  mongoose.model('File').find({deleted: {$eq: true}}, function(err, files) {
    if (err) {
      console.error(err);
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
      console.error(err);
      return res.status(500).json(err);
    }

    res.json(newFile);
  });
});


// update existing file with edited data
router.put('/file/:fileId', function(req, res, next) {
  const File = mongoose.model('File');
  const fileId = req.params.fileId;

  File.findById(fileId, function(err, file) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (!file) {
      return res.status(404).end(`Could not find file '${fileId}'`);
    }
    
    file.series = req.body.series;
    file.volume = req.body.volume;
    file.issue = req.body.issue;
    file.coverDate = req.body.coverDate;

    file.save(function(err, savedFile) {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json(savedFile);
    })

  })
});

// soft delete file by setting deleted to true
router.delete('/file/:fileId', function(req, res, next) {
  const File = mongoose.model('File');
  const fileId = req.params.fileId;

  File.findById(fileId, function(err, file) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (!file) {
      return res.status(404).json({message: "File not found"});
    }

    file.deleted = true;

    file.save(function(err, doomedFile) {
      res.json(doomedFile);
    })

  })
});

// GET file by id - not used in app yet
router.get('/file/:fileId', function(req, res, next) {
  const File = mongoose.model('File');
  const fileId = req.params.fileId;

  File.findById(fileId, function(err, file) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (!file) {
      return res.status(404).end(`Could not find file '${fileId}'`);
    }
    res.json(file);
  })

});

module.exports = router;
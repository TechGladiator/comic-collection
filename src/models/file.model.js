// Load mongoose package
const mongoose = require('mongoose');

// Create Database Schema
const FileSchema = new mongoose.Schema({
  series: String,
  volume: String,
  issue: String,
  coverDate: String,
  created_at: { type: Date, default: Date.now },
  deleted: {type: Boolean, default: false}
});

const File = mongoose.model('File', FileSchema);
module.exports = File;

// count documents in collection
File.count({}, function(err, count) {
  if (err) {
    throw err;
  }
  if (count > 0) return;
  
  // add seed data
  const files = require('./file.seed.json');
  File.create(files, function(err, newFiles) {
    if (err) {
      throw err;
    }
    console.log("DB seeded")
  });
});

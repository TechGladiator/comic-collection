// Load mongoose package
const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  series: String,
  volume: String,
  issue: Number,
  coverDate: String,
  created_at: { type: Date, default: Date.now },
});

const File = mongoose.model('File', FileSchema);
module.exports = File;
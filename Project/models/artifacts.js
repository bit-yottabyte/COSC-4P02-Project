const mongoose = require('mongoose');

const artifactSchema = new mongoose.Schema({
  name: String,
  artifact_id: String,
  event_id: Number,
  location_id: Number,
  date: Date,
  description: String,
  image_source: String,
  artifact_tag: String
});

const Artifacts = mongoose.model('Artifacts', artifactSchema);

module.exports = Artifacts;
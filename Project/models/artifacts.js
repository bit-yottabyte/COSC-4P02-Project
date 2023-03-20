const mongoose = require("mongoose");

const artifactSchema = new mongoose.Schema({
	name: String,
	artifact_id: Number,
	location_id: Number,
	description: String,
	image_source: String,
});

const Artifacts = mongoose.model("Artifacts", artifactSchema);

module.exports = Artifacts;

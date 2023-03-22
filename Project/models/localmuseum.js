const mongoose = require("mongoose");

const localMuseumSchema = new mongoose.Schema({
	museum_id: Number,
	location_name: Number,
	address: String,
	name: String,
});

const Local_Museum = mongoose.model("local_museum", localMuseumSchema);

module.exports = Local_Museum;

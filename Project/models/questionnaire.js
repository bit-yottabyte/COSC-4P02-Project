const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
	name: String,
	email: String,
	q3: String,
	q4: String,
	q5: String,
});

const Location = mongoose.model("form_answers", questionSchema);

module.exports = Location;

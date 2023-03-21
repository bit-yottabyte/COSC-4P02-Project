const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
	question_id: Number,
	question: String,
	answer: {
		answer_1: String,
		answer_2: String,
		answer_3: String,
		answer_4: String,
	},
	artifact_id: Number,
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;

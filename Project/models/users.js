const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	uname: String,
	usid_1: String,
	password: String,
});
// hash the password
userSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

//third parameter explicitly names the collection reference to "quiz" instead of "quizzes"
const User = mongoose.model("users", userSchema);

module.exports = User;

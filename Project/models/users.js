const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
});

//third parameter explicitly names the collection reference to "quiz" instead of "quizzes"
const User = mongoose.model("users", userSchema);

// hash the password
userSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = User;

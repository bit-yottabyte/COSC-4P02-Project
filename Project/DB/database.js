const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());

const username = "one";
const password = "one";
const Events = require("../models/events");
const Artifacts = require("../models/artifacts");
const Location = require("../models/location");
const local_museum = require("../models/localmuseum");
const Quiz = require("../models/quiz");
const Questionnaire = require("../models/questionnaire");
const User = require("../models/users");

const uri =
	"mongodb+srv://" +
	username +
	":" +
	password +
	"@museumdb.bvh1jvz.mongodb.net/Museum?retryWrites=true&w=majority";
//connect to the database
mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log("Current database: " + mongoose.connection.db.databaseName);
	console.log("Database connected");
});

app.use(express.urlencoded({ extended: true }));

//endpoint to query the entire events collection
app.post("/queryAllEvents", async (req, res) => {
	try {
		const events = await Events.find({});
		res.json(events);
	} catch (error) {
		res.status(500).json({ message: error.message });
	} finally {
	}
});

//endpoint to query the entire events collection
app.post("/queryEventByID", async (req, res) => {
	try {
		const event = await Events.find({
			event_id: parseInt(req.query.id),
		});
		res.json(event);
	} catch (error) {
		res.status(500).json({ message: error.message });
	} finally {
	}
});

//endpoint to add to questionnaire collection
app.post("/add", async (req, res) => {
	try {
		const newAnswer = new Questionnaire({
			name: req.body.name,
			email: req.body.email,
			q3: req.body.dropdown,
			q4: req.body.like,
			q5: req.body.radio,
		});
		newAnswer.save();
		res.json(newAnswer);
	} catch (error) {
		res.status(500).json({ message: error.message });
	} finally {
	}
});

//endpoint to query the entire artifacts collection
app.post("/queryAllArtifacts", async (req, res) => {
	try {
		const artifacts = await Artifacts.find({});
		res.json(artifacts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	} finally {
	}
});

//endpoint to query the artifacts collection based on matching name input
app.post("/queryArtifacts", async (req, res) => {
	try {
		//find 10 most similar artifacts by matching name
		const artifacts = await Artifacts.find({
			name: { $regex: req.query.name, $options: "i" },
		}).limit(10);
		res.json(artifacts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	} finally {
	}
});

//endpoint to query the artifacts collection based on matching name input
app.post("/queryArtifactByID", async (req, res) => {
	try {
		const artifact = await Artifacts.find({
			artifact_id: parseInt(req.query.id),
		});
		res.json(artifact);
	} catch (error) {
		res.status(500).json({ message: error.message });
	} finally {
	}
});

//endpoint to query the location collection
app.post("/queryLocation", async (req, res) => {
	try {
		const location = await Location.find({});
		res.json(location);
	} catch (error) {
		res.status(500).json({ message: error.message });
	} finally {
	}
});

//endpoint to query the local museum collection
app.post("/queryLocalMuseum", async (req, res) => {
	try {
		const localmuseum = await local_museum.find({});
		res.json(localmuseum);
	} catch (error) {
		res.status(500).json({ message: error.message });
	} finally {
	}
});

//endpoint to query the quiz collection
app.post("/queryQuiz", async (req, res) => {
	try {
		//query 15 quiz questions
		const quiz = await Quiz.find({}).limit(15);
		res.json(quiz);
	} catch (error) {
		res.status(500).json({ message: error.message });
	} finally {
	}
});

app.post("/register", async (req, res) => {
	var new_user = new User({
		uname: req.body.uname,
	});

	new_user.password = new_user.generateHash(req.body.passwd);
	new_user.save();
	res.json(new_user);
});

app.post("/login", async (req, res) => {
	const user = await User.findOne({ uname: req.body.uname });
	if (user === null) {
		res.header("Access-Control-Allow-Credentials", true);
		//replace with website
		res.header(
			"Access-Control-Allow-Origin",
			"https://bit-yottabyte.github.io"
		);
		res.status(400).json({ message: "invalid user" });
	} else if (!user.validPassword(req.body.passwd)) {
		//password did not match
		res.header("Access-Control-Allow-Credentials", true);
		//replace with website
		res.header(
			"Access-Control-Allow-Origin",
			"https://bit-yottabyte.github.io"
		);
		res.send("Failed to login");
	} else {
		//1 is placeholder
		const usid = 1;
		// password matched. proceed forward
		user.usid_1 = 1;
		user.save();
		res.header("Access-Control-Allow-Credentials", true);
		//replace with website
		res.header(
			"Access-Control-Allow-Origin",
			"https://bit-yottabyte.github.io"
		);
		res.cookie("user", req.body.uname, { sameSite: "none", secure: true });
		res.cookie("sid", 1, { sameSite: "none", secure: true });
		res.json({ username: req.body.uname, sid: 1 });
	}
});

app.post("/checkLogin", async (req, res) => {
	const cookie = req.headers.cookie;
	if (cookie === undefined) {
		res.header("Access-Control-Allow-Credentials", true);
		// replace with website
		res.header(
			"Access-Control-Allow-Origin",
			"https://bit-yottabyte.github.io"
		);
		res.send("not logged in");
	} else {
		const cookieArray = cookie.split("; ");
		const cA = cookieArray[0].split("=");
		const uName = cA[1];
		const sidA = cookieArray[1].split("=");
		const sid = sidA[1];
		const user = await User.findOne({ uname: uName, usid_1: sid });
		res.header("Access-Control-Allow-Credentials", true);
		// replace with website
		res.header(
			"Access-Control-Allow-Origin",
			"https://bit-yottabyte.github.io"
		);
		if (user === null) {
			res.send("Not logged in");
		} else {
			// password matched. proceed forward
			res.send("Logged in");
		}
	}
});

app.post("/logout", async (req, res) => {
	res.header("Access-Control-Allow-Credentials", true);
	// replace with website
	res.header("Access-Control-Allow-Origin", "https://bit-yottabyte.github.io");
	const cookie = req.headers.cookie;
	const cookieArray = cookie.split("; ");
	const cA = cookieArray[0].split("=");
	const uName = cA[1];
	const sidA = cookieArray[1].split("=");
	const sid = sidA[1];
	const user = await User.findOne({ uname: uName });
	res.clearCookie("user");
	res.clearCookie("sid");
	if (user === null) {
		res.send("error");
	} else {
		await User.updateOne(
			{ uname: uName, usid_1: sid },
			{ $unset: { usid_1: "" } }
		);
		const log = await User.findOne({ uname: uName, usid_1: sid });
		if (log === null) {
			res.send("Logged out");
		} else {
			res.send("Um ok");
		}
	}
});

app.listen(3000, function () {
	console.log("Listening on port 3000...");
});

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
app.use(express.urlencoded({ extended: true }));

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
		res.redirect(
			"https://bit-yottabyte.github.io/COSC-4P02-Project/Project/questionnaire.html"
		);
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
		const artifacts = await Artifacts.find({});
		res.json(artifacts);
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

app.listen(3000, function () {
	console.log("Listening on port 3000...");
});

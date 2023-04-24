const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const uuid = require("uuid");
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

app.post("/queryEvents", async (req, res) => {
	try {
		//find 10 most similar artifacts by matching name
		const events = await Events.find({
			name: { $regex: req.query.name, $options: "i" },
		}).limit(10);
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
app.post("/addEvent", async (req, res) => {
	var numEvents = await Events.count();
	try {
		const id = await Events.findOne({ event_id: req.body.id });
		if (id == null) {
			const newEvent = new Events({
				name: req.body.name,
				event_id: req.body.id,
				location_id: 1,
				date: req.body.date,
				description: req.body.description,
				image_source: req.body.image,
			});
			newEvent.save();
			res.json(newEvent);
		} else {
			res.send("Id already in system");
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	} finally {
	}
});

app.post("/updateEvent", async (req, res) => {
	try {
		var event = await Events.findOne({ event_id: req.body.id });
		if (event != null) {
			await Events.updateOne(
				{
					event_id: req.body.id,
				},
				{
					name: req.body.name,
					date: req.body.date,
					description: req.body.description,
					image_source: req.body.image,
				}
			);
		}
		event = await Events.findOne({ event_id: req.body.id });
		res.json(event);
	} catch (error) {
		res.status(500).json({ message: error.message });
	} finally {
	}
});

//endpoint to add to questionnaire collection
app.post("/deleteEvent", async (req, res) => {
	try {
		var event = await Events.findOne({ event_id: req.body.eventID });
		if (event != null) {
			await Events.deleteOne({ event_id: req.body.eventID });
		}
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

app.post("/getAnswers", async (req, res) => {
	try {
		const answers = await Questionnaire.find({});
		res.json(answers);
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
		}).limit(15);
		res.json(artifacts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	} finally {
	}
});

//endpoint to query the amount of artifacts
app.post("/queryArtifactAmount", async (req, res) => {
	try {
		let result = await Artifacts.find();
		res.json(result.length);
	} catch (error) {
		res.status(500).json({ message: error.message });
	} finally {
	}
});

//endpoint to query the amount of artifacts
app.post("/insertArtifact", async (req, res) => {
	try {
		var newArtifact = new Artifacts({
			name: req.body.name,
			artifact_id: req.body.artifact_id,
			event_id: -1,
			location_id: req.body.location_id,
			date: req.body.date,
			description: req.body.description,
			image_source: req.body.image_source,
			artifact_tag: req.body.artifact_tag,
		});

		const savedArtifact = await newArtifact.save();
		res.json(savedArtifact);
	} catch (error) {
		res.status(500).json({ message: error.message });
	} finally {
	}
});

//endpoint to query the amount of artifacts
app.post("/addArtifact", async (req, res) => {
	try {
		var id = await Artifacts.findOne({ artifact_id: req.body.id });
		if (id == null) {
			var newArtifact = new Artifacts({
				name: req.body.name,
				artifact_id: req.body.id,
				event_id: -1,
				location_id: 2,
				date: req.body.date,
				description: req.body.description,
				image_source: req.body.image,
				artifact_tag: req.body.tag,
			});

			const savedArtifact = await newArtifact.save();
			res.json(savedArtifact);
		} else {
			res.send("Id already in system");
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	} finally {
	}
});

app.post("/updateArtifact", async (req, res) => {
	try {
		var artifact = await Artifact.findOne({ artifact_id: req.body.id });
		if (artifact != null) {
			await Artifacts.updateOne(
				{
					artifact_id: req.body.id,
				},
				{
					name: req.body.name,
					date: req.body.date,
					description: req.body.description,
					image_source: req.body.image,
				}
			);
		}
		artifact = await Artifacts.findOne({ artifact_id: req.body.id });
		res.json(artifact);
	} catch (error) {
		res.status(500).json({ message: error.message });
	} finally {
	}
});

//endpoint to query the artifacts collection based on Tag
app.post("/queryArtifactByTag", async (req, res) => {
	try {
		const artifact = await Artifacts.find({
			artifact_tag: req.query.tag,
		});
		res.json(artifact);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//endpoint to add to questionnaire collection
app.post("/deleteArtifact", async (req, res) => {
	try {
		var artifact = await Artifacts.findOne({
			artifact_id: req.body.artifactID,
		});
		if (artifact != null) {
			await Artifacts.deleteOne({ artifact_id: req.body.artifactID });
		}
		res.json(artifact);
	} catch (error) {
		res.status(500).json({ message: error.message });
	} finally {
	}
});

//endpoint to query the artifacts collection based on matching name input
app.post("/queryArtifactByID", async (req, res) => {
	try {
		const artifact = await Artifacts.find({
			artifact_id: req.query.id,
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

app.post("/login", async (req, res) => {
	const user = await User.findOne({ uname: req.body.uname });
	if (user === null) {
		res.header("Access-Control-Allow-Credentials", true);
		//replace website with domain you use if needed
		res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
		res.status(400).json({ message: "invalid user" });
	} else if (!user.validPassword(req.body.passwd)) {
		//password did not match
		res.header("Access-Control-Allow-Credentials", true);
		//replace website with domain you use if needed
		res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
		res.send("Failed to login");
	} else {
		//1 is placeholder
		const usid = uuid.v4();
		// password matched. proceed forward
		user.usid_1 = usid;
		user.save();
		res.header("Access-Control-Allow-Credentials", true);
		//replace website with domain you use if needed
		res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
		res.cookie("user", req.body.uname, {
			sameSite: "none",
			secure: true,
			overwrite: true,
			maxAge: 1 * 60 * 60 * 1000,
		});
		res.cookie("sid", usid, {
			sameSite: "none",
			secure: true,
			overwrite: true,
			maxAge: 1 * 60 * 60 * 1000,
		});
		res.json({ username: req.body.uname, sid: usid });
	}
});

app.post("/checkLogin", async (req, res) => {
	const cookie = req.headers.cookie;
	if (cookie === undefined) {
		res.header("Access-Control-Allow-Credentials", true);
		//replace website with domain you use if needed
		res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
		res.send("Not logged in");
	} else {
		const cookieArray = cookie.split("; ");
		const cA = cookieArray[0].split("=");
		const uName = cA[1];
		const sidA = cookieArray[1].split("=");
		const sid = sidA[1];
		const user = await User.findOne({ uname: uName, usid_1: sid });
		res.header("Access-Control-Allow-Credentials", true);
		//replace website with domain you use if needed
		res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
		if (user === null) {
			res.send("Not logged in");
		} else {
			// password matched. proceed forward
			res.send("Logged in");
		}
	}
});

app.post("/checkAdmin", async (req, res) => {
	const cookie = req.headers.cookie;
	if (cookie === undefined) {
		res.header("Access-Control-Allow-Credentials", true);
		//replace website with domain you use if needed
		res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
		res.status(403).json({ message: "Denied Access" });
	} else {
		const cookieArray = cookie.split("; ");
		const cA = cookieArray[0].split("=");
		const uName = cA[1];
		const sidA = cookieArray[1].split("=");
		const sid = sidA[1];
		const user = await User.findOne({ uname: uName, usid_1: sid });
		res.header("Access-Control-Allow-Credentials", true);
		//replace website with domain you use if needed
		res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
		if (user === null) {
			res.status(403).json({ message: "Denied Access" });
		} else {
			// password matched. proceed forward
			res.send("Logged in");
		}
	}
});

app.post("/logout", async (req, res) => {
	res.header("Access-Control-Allow-Credentials", true);
	//replace website with domain you use if needed
	res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
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
			res.send("Error");
		}
	}
});

app.listen(3000, function () {
	console.log("Listening on port 3000...");
});

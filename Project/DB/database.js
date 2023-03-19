const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
app.use(cors());

const username = "one";
const password = "one";
const Events = require("../models/events");
const Artifacts = require("../models/artifacts");

const uri = 'mongodb+srv://'+username+':'+password+'@museumdb.bvh1jvz.mongodb.net/Museum?retryWrites=true&w=majority';
//connect to the database
mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Current database: " + mongoose.connection.db.databaseName);
	console.log('Database connected');
});

//endpoint to query the events collection
app.post('/queryEvents', async (req, res) => {
	try {
		const events = await Events.find({});
		res.json(events);
	} catch (error) {
		res.status(500).json({ message: error.message });
	} finally {
	}
});

//endpoint to query the artifacts collection
app.post('/queryArtifacts', async (req, res) => {
	try {
		const artifacts = await Artifacts.find({});
		res.json(artifacts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	} finally {
	}
});

app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
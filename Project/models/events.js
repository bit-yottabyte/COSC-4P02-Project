const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  event_id: Number,
  location_id: Number,
  date: Date,
  description: String,
  image_source: String
});

const Events = mongoose.model('Events', eventSchema);

module.exports = Events;
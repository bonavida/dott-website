var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  name:  String,
  description: String,
  image:   String,
  location: {
      name: String,
      coords: {
          latitude: Number,
          longitude: Number
      }},
  creator: {
            userID: String,
            name: String,
            image: String
          },
  executionDate:   Date,
  creationDate: Date,
  minParticipants: Number,
  maxParticipants: Number,
  closed: Boolean,
  score:[{comment: String, star: Number, userID: String, name: String, image: String}],
  participants: [{userID: String, name: String, image: String}],
  chat:[{message: String, date: Date, name: String, image: String}],
  categories: [{name:String}]
});

module.exports = mongoose.model('Activity', ActivitySchema);

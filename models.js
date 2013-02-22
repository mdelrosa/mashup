//models.js

// models.js

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/squaretube');

// set Schema
Schema = mongoose.Schema;

//  schema for user with name and list of tweets
var UserSchema = new Schema({
  name: String,
  password: String
});

// schema for twit: author and twit content
var SquareSchema = new Schema({
	author: String,
	location: String,
	comment: String,
	url: String,
	time: Number
})

// pack schema as model
var User = mongoose.model('User', UserSchema)
var Squares = mongoose.model('Squares', SquareSchema)

// exports
exports.user = User;
exports.squares = Squares;

//models.js

// models.js

var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_app12196861:ri6idkj7iik3l96ak122h2oenb@ds053607.mongolab.com:53607/heroku_app12196861' ||
process.env.MONGOLAB_URI || 'mongodb://localhost/squaretube');

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

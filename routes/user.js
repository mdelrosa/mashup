
/*
 * GET users listing.
 */

var models = require('../models'),
    User = models.user,
    Squares = models.squares;

exports.list = function(req, res){
  res.send("Main Page");
};

exports.main = function(req, res) {

    Squares.find({}).sort('time').exec(function(err, squareData) {
      if(err) console.log(err)
      else {
      	if (req.session.user === undefined) {
	      res.render('index', {
	  	    title: 'SquareTube',
		    squares: [],
		    user: false
	      });
        }
        else {
          res.render('index', {
          	title: 'SquareTube',
          	squares: squareData,
          	user: req.session.user
          });
        }
      }
    });
}

//login exports
exports.login_page = function(req, res) {
	res.render('login', {title: 'SquareTube'})
}

exports.login_action = function(req, res) {
	var name = req.body.username;
	User.findOne({name: name}).exec(function(err, user) {
		if (req.body.password === user.password) {
			req.session.user = user.name;
			return res.redirect('/')
		}
		else {
			return res.redirect('/login')
		}
	})
}

//add a user
exports.new_user = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var confirm_password = req.body.confirm_password;
  if (password === confirm_password) {
	var new_user = new User({
	  name: username,
	  password: password
    });
    new_user.save(function(err) {
	  if (err) console.log('error', err)
	  else {
	    console.log('new user saved')
	  }
    });
	req.session.user = new_user.name;
	return res.redirect('/');
  }
  else {
  	return res.redirect('/login')
  }

}

//upload a new square
exports.upload = function(req, res){
  var squareTime = new Date().getTime() / 1000 * -1;
  var new_square = new Squares ({
    author: req.session.user,
    location: req.body.location,
    comment: req.body.comment,
    url: req.body.url,
    time: squareTime
  });
  new_square.save(function(err) {
    if (err) console.log('error', err)
    else {
      console.log('saved square');
    }
  });
}

//refresh squares
exports.refresh = function(req, res) {
  Squares.find({}).sort('time').execFind(function(err, db_squares) {
  if(err) console.log(err)
  else
  	  if (req.session.user === undefined) {
        res.render("_squares.jade", {
          squares: false
        });
      }
      else {
      	res.render("_squares.jade", {
      		squares: db_squares
      	});
      }
  });
}

//log user out
exports.logout = function(req, res) {
	req.session.destroy();
	res.redirect('/')
}
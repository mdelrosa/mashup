
/*
 * GET users listing.
 */

var models = require('../models'),
    User = models.user,
    Squares = models.squares;

exports.list = function(req, res){
  res.send("Main Page");
};

exports.main = function(req, res){

    Squares.find({}).sort('time').exec(function(err, squareData) {
      if(err) console.log(err)
      else {
      	if (req.session.user === false) {
	      res.render('index', {
	  	    title: 'SquareTube',
		    squares: [],
		    user: false
	      });
        }
        else {
          console.log(req.session.user)
          res.render('index', {
          	title: 'SquareTube',
          	squares: squareData,
          	user: req.session.user
          })
        }
      }
    });

}

//login exports
exports.login_page = function(req, res) {
	res.render('login', {title: 'SquareTube'})
}

exports.login_action = function(req, res) {
	console.log(req.body)
	User.find({'username': req.body.username}).exec(function(err, user) {
		if (req.body.password === user.password) {
			req.session.user = user.username;
			console.log(req.session)
			return res.redirect('/')
		}
		else {
			return res.redirect('/login')
		}
	})
}

exports.new_user = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
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
  req.session.user = new_user;
  return res.redirect('/');
}

exports.upload = function(req, res){
  var squareTime = new Date().getTime() / 1000 * -1;
  console.log('req', req.body)
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

exports.refresh = function(req, res) {
  Squares.find({}).sort('time').execFind(function(err, db_squares) {
  if(err) console.log(err)
  else
  	  if (req.session.user === false) {
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
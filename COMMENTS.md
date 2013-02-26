# Instructor comments on code for the purposes of improvement

*N.B. You may remove this file from your repository after copying it so that others (potential employers, fans, open-source enthusiasts) do not see it.*

## General Comments

* You should add a .gitignore file.  [Here's a useful link in case you don't know what a .gitignore file does.](https://help.github.com/articles/ignoring-files)  Make one and add `node_modules/` to it so you don't commit the monstrosity that is a node_modules folder to your repo.  People will get all those files when they do an `npm install` via your `package.json`.
* Delete `procfile`.  We only care about `Procfile` so the other one shouldn't be in your repository.
* On your front page, you should make one of those huge texts that "Log In" be a link to the login page.  It was kind of confusing.

## `app.js`

Looks fine to me.

If you ever make a real application not for a class project, you'll probably want to generate a real secret for your cookies.  On [Line 26](https://github.com/JLangowitz/mashup/blob/master/app.js#L26) you use the default secret generated by Express.  Just a pointer so you don't forget to actually populate this with something real later on.

## `models.js`

Your `mongoose.connect` on [Line 6](https://github.com/mdelrosa/mashup/blob/master/models.js#L6) really belongs inside the `app.configure` function inside the file `app.js`.  This ensures that it will only run once.  If you have it in your `models.js` file, and that file gets `require`d more than once, Node will throw an error about having too many open connections.

By the way, when you build a more complex application, you may consider making a separate folder for models, and then making each file in the directory its own model---for the sake of modularity; you know what I'm talking about.

## `routes`

### `index.js`

You don't use this anywhere, just delete the file and [this line](https://github.com/mdelrosa/mashup/blob/master/app.js#L7) in `app.js`.

### `user.js`

Do you need this [exports.list](https://github.com/mdelrosa/mashup/blob/master/routes/user.js#L10) function?  If you don't really use it for anything, scrap it.

In [Line 17](https://github.com/mdelrosa/mashup/blob/master/routes/user.js#L17) you should always `return console.log (err);`.  If you don't return, you will log the error and then continue on with the code that is only supposed to run in case of success.

In [Line 19](https://github.com/mdelrosa/mashup/blob/master/routes/user.js#L19), instead of `if (req.session.user === undefined)`, it's common practice to just use `if (!req.session.user)`.

In [Line 45](https://github.com/mdelrosa/mashup/blob/master/routes/user.js#L45), don't.  You shouldn't test for existence of a user by comparing passwords.  That's dangerous!  Instead, do it like this:

```js

User.findOne({name: name}).exec(function(err, user) {
  if (user) // If the user doesn't exist, this will be null, and they will be returned to the login page.
		req.session.user = user; // Otherise, set the session user to the new user
		return res.redirect('/');
	}
	else {
		return res.redirect('/login');
	}
});

```

## `public`

### `javascripts/main.js`

Don't use JS alerts.  Make an error page or something and render that.
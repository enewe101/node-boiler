This repository contains a boiler plate node/express/react app.  Use it as a
starting point for your new app.

Follow these steps to configure this repo to be the starting point for your new
app:

1) Associate this to a new repo for your project:

		$ git remote rm origin
		$ git remote add origin <uri for new repo>
		$ git push -u origin master

4) Turn `bin/ubuntu-setup.sh` into a setup script that configures a fresh
	ubuntu box into a server for your new app.  Just make a few needed changes
	in various places marked by "TODO"s.

5) Edit `.env` to reflect various constants related to your project.

6) If your app will communicate with Facebook, Twitter, etc., then you'll need
	to get tokens and secrets.  You should have two sets of tokens and
	keys: one for your production server, and one for your dev and staging
	environments.   Put the development set in `.keys.dev` and production 
	keys in `.keys.prod.gpg`.  Never commit the keys -- share them through a
	secure mechanism to the people who need them, and only keep your production
	keys encrypted on your production server.

6) Now that you've done the steps in this README you can get rid of it.
	Replace it with another README that will be used by developers to get
	started on your project:

	$ mv README.new.md README.md

	Go ahead and follow the steps in that README.

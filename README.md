This repository contains a boiler plate MERN app.  You can clone it and use it
as a starting point for your new app.  The first thing you'll need to do after
cloning it is disassociate it from the current git repo, and associate it to a
new repo for your new app!

Follow these steps to configure this repo to be the starting point for your new
app:

1) Associate this to a new repo for your project:

		$ git remote rm origin
		$ git remote add origin <uri for new repo>
		$ git push -u origin master

4) Turn `bin/ubuntu-setup.sh` into a setup script that configures a fresh
	ubuntu box into a server for your new app.  Just make a few needed changes
	in various places marked by "TODO"s.

5) Edit `.env.dev` to reflect your project's name and your domain name.  There
	are three versions of your domain name: 
    1. your actual domain name, which should resolve to your production server;
    2. your development domain name, which should be like your production
	   domain name, but with the TLD changed to `dev` (e.g. example.com ->
       example.dev); and
    3. your staging domain name, which should be a subdomain of your production
	   domain name, e.g. staging.example.com.

# This has been moved to the developper's setup steps (in README.new.md)
#6) Make a self-signed certificate issued to your development domain name.  If
#	you've edited `.env.dev`, then all you need to do is run
#	`bin/self-sign-cert.sh`.  Commit the three files generated inside
#	`<proj>/cert` to your project's repo.  You will need to force the commit
#	because .gitignore is configured to not track anythin uncer `<proj>/cert`.
#	The develpment certificate isn't sensitive.  But never commit a real
#	certificate for the production server to the repo (the certificate should be
#	revoked immediately if you do).

7) If your app will communicate with Facebook, Twitter, etc., then you'll need
	to get tokens and secrets.  Generally, you'll need two sets of tokens and
	keys: one for your production server, and one for your dev and staging
	environments.   Put the development set in `.keys.dev`, but don't
	commit them -- you'll need to share out the dev keys to your developpers
	through some secure mechanism.  The production credentials should only
	ever be kept in encrypted form on access-restricted systems.

8) Now that you've done the steps in this README, they won't need to be done
	again by other developers who clone the repo.  Go ahead and replace this
	README with the `README.new.md`:

	$ mv README.new.md README.md

	And follow the steps in the other README, which is the README that
	developpers will refer to to set up their individual environments.



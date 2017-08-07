There are various things you need to do now to complete the cloning and setup
of your new webapp.

1) Create a new repository for your project.  Add a remote that points to that
	new repository:

		$ git remote add origin <uri for new repo>
		$ git push -u origin master

2) The README you are currently reading pertains to making a new project from
	the boiler plate.  But now, you want the README to tell other developers
	how to clone your project and get their development environment up and
	running.  You also want it to explain how to setup the staging and
	production environments.  Replace the `README.md` that you are currently
	reading with `README.new.md`.  Edit that file to include the github uri's
	for your new repo.

4) Edit `bin/ubuntu-setup.sh`, in the places indicated -- Look for "TODO"
	comments.  This script is used to set up the staging and production
	environments (on ubuntu boxes).

5) Edit `.env.dev` to reflect your project's name and your domain name.  There
	are three versions of your domain name: 
    1. your actual domain name, which should resolve to your production server;
    2. your development domain name, which should be like your production
	   domain name, but with the TLD changed to `dev` (e.g. example.com ->
       example.dev); and
    3. your staging domain name, which should be a subdomain of your production
	   domain name, e.g. staging.example.com.

6) Make a self-signed certificate issued to your development domain name.  If
	you've edited `.env.dev`, then all you need to do is run
	bin/self-sign-cert.sh.  Commit the three files generated inside <proj>/cert
	to your project's repo.  You will need to force the commit because
	.gitignore is configured to not track anythin uncer <proj>/cert.  The
	develpment certificate isn't sensitive.  But never commit a real
	certificate for the production server to the repo (the certificate should
	be revoked immediately if you do).

7) Fill in the needed info in .keys.dev.  You should get IDs and secrets for
	communicating with Facebook, Twitter, and any other OAuth providers.  You
	should obtain one set of credentials for your production server, and one set
	for your development and stagin environments.  Both should be considered
	sensitive, and not committed to the repo.  However, you will have to 
	distribute the development credentials to your developers.  The production
	credentials should only every be kept in encrypted form on
	access-restricted systems.

8) Next, follow the steps in README.new.md to setup a development, staging, or
	production environment.

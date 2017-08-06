There are various things you need to do now to complete the cloning and setup
of your new webapp.

1) Create a new repository for your project.  Add a remote that points to that
	new repository:

		$ git remote add origin <uri for new repo>
		$ git push -u origin master

2) The current README pertains to making a new project from the boiler plate.  
	But now, you want the README to tell other developers how to clone
	your project and get their development environment up and running.  You
	also want it to explain how to setup the staging and production
	environments.  Edit the contents of `README.new.md` to to reflect that, and
	then move it to `README.md`.

4) Edit `bin/ubuntu-setup.sh`, in the places indicated.
	`bin/ubuntu-setup.sh` at the locations indicated by comments, to reflect 
	your projects' information.  This simplifies setting up the staging
	environment on ubuntu boxes.

5) Edit `.env.dev` and add your domain name and your project name to it.  Note
	that your domain name should be your desired production domain name, but
	with .dev as the TLD.

7) Make a self-signed certificate issued to `<your domain>.dev`
	(This is based on what you entered into `.env.dev` as `HOST`.

7) Add the contents of <path-to-project>/cert to the repo.  This contains the
	SSL certificate for development, which is not sensitive. (Never add a
	certificate destined to be used in production to the repo!)

5) Fill in the needed info in .keys.dev.  This will allow your app to

	communicate with Facebook, Twitter, and Instagram.  To do this, you will 
	need to create accounts with each of those providers for your new app.
	Those providers will want to know your domain name -- you need enter your
	domain name with `.dev` as the TLD.  

	(For production, you'll need to make a separate set of keys that are bound
	to your true domain name, with the desired TLD.)

	Do not add .keys.dev to your repository.  Consider this to be a sensitive
	secret, because abuse of those keys would hurt your reputation with the
	providers.  Distribute .keys.dev separately to your developpers over
	secure communication.  You can always ask the providers to reset secrets if
	you suspect compromise, and then disseminate the new secrets to your 
	developers.

6) Follow the steps to setup your development environment.

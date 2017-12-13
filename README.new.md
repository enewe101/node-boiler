**To start developing on a Mac:**

1. Clone this repo.
2. Install docker community edition and docker-compose (on a mac these are
   bundled together).
4. Have a look at `dev-cheatsheet.txt` for a guide on starting up and
   managing the development environment.
5. Start the development environment by doing 

		$ ./start.sh --dev

**To setup a staging or production environment on an Ubuntu machine:**

1. Clone this repo
2. Make secrets for authentication between services of the app by running.
   This takes the environment variables in .env, and replaces any instance of
   "secret" with a random string.

        $ bin/make-env.sh

3. If needed, obtain secrets from providers (Facebook, Twitter, Instagram, etc)
   to be used for dev, staging, or production.  Dev keys can be kept in 
   plaintext in `.keys` but keep encrypt staging and production keys in
   `.keys.gpg`.  Never commit any keys to the repo!
3. Run this command to get the host ready to run the app:
        $ bin/ubuntu-setup.sh
3. Start the staging environment by doing 

        $ ./start.sh --<mode>

   Where <mode> should be replaced with "stage" or "prod".


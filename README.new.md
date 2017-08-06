**To start developing:**

    1. Clone this repo.
    2. Install docker community edition and docker-compose (On mac,
	   docker-compose is bundled in with docker community edition)
    3. Map requests issued to `https?://*.dev` to localhost.  On mac, you can
	   do this by running `bin/mac-dev-localhost.sh`.
	4. Have a look at dev-cheatsheet.txt for a guide on starting up and
	   managing the development environment.
	5. Start the development environment by doing 
            $ ./start.sh

**To setup a staging environment on a new machine do:**

    1. Run this command on the target machine:
        bash <(curl https://raw.githubusercontent.com/enewe101/webapp-boiler/master/bin/ubuntu-setup.sh)
	2. Ensure that DNS lookup of the hostname assigned to the STAGE\_HOST 
        variable in `.env.dev` will point to the staging server.
    2. Have a look at the dev-cheatsheet.txt for a guid on starting up and
	   managing the development environment.
	3. Start the staging environment by doing 
            $ ./start.sh --stage


**To start production do:**

    1. Run this command on the target machine:
			$ bash <(curl https://raw.githubusercontent.com/enewe101/webapp-boiler/master/bin/ubuntu-setup.sh)
    2. Make secrets for authentication between services of the app by running
            $ bin/make-env.sh
       You will need to provide a passphrase.  The secrets will be stored in 
       `.env.prod.gpg`.
    3. Obtain secrets from providers (Facebook, Twitter, Instagram, etc) and
       encrypt the secrets and IDs into .keys.prod.gpg
	4. Obtain an SSL certificate for the domain by running
            $ bin/letsencrypt.sh
       You may need to modify nginx's configuration and restart it to make the
       well-known file servable.  Be sure to copy the certificate and private
       key into the locations expected according to nginx's config.  Also, be
       sure to create a diffie hellman group, if not already done by that 
       script.
	5. Start the production environment by doing 
            $ ./start.sh --prod



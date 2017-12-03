**To start developing on a Mac:**

1. Clone this repo (you've probably already done that)
2. Install docker community edition and docker-compose.  You install them
   together because docker-compose is bundled in with docker community edition 
   on Mac

3. Map requests issued to `https?://*.dev` to localhost, and create a
   self-signed certificate.  

		$ bin/mac-setup.sh

4. Have a look at `dev-cheatsheet.txt` for a guide on starting up and
   managing the development environment.

5. Start the development environment by doing 

		$ source .env.dev
		$ ./start.sh

**To setup a staging environment on a new Ubuntu virtual machine do:**

1. Run this command on the target machine:

		#TODO: change this to point to the new repo for this project
        $ bash <(curl https://raw.githubusercontent.com/enewe101/webapp-boiler/master/bin/ubuntu-setup.sh)

2. Obtain your domain name, and ensure that the subdomain at which your staging
   server will reside (as indicated in by the STAGE\_HOST variable in 
   `.env.dev`) is mapped to your staging server's IP address.

3. If you haven't already done so, obtain secrets from providers (Facebook,
   Twitter, Instagram, etc) to be used for dev and staging, and put them into 
   `.keys.dev`.

4. Obtain an SSL certificate for your staging subdomain by running

        $ bin/letsencrypt.sh

   You may need to modify nginx's configuration and restart it to make the
   well-known file servable.  Be sure to copy the certificate and private
   key into the locations expected according to nginx's config.  Also, be
   sure to create a Diffie Hellman group, if not already done by that 
   script.

3. Start the staging environment by doing 

        $ ./start.sh --stage


**To start production do:**

1. Run this command on the target machine:

        $ bash <(curl https://raw.githubusercontent.com/enewe101/webapp-boiler/master/bin/ubuntu-setup.sh)

2. Make secrets for authentication between services of the app by running

        $ bin/make-env.sh

   You will need to provide a passphrase.  The secrets will be stored in 
   `.env.prod.gpg`.

2. Obtain your domain name (as indicated in by the STAGE\_HOST variable in 
   `.env.dev`), and ensure it is mapped to your staging server's IP address.

3. Obtain secrets from providers (Facebook, Twitter, Instagram, etc) and
   encrypt the secrets and IDs into `.keys.prod.gpg`.

4. Obtain an SSL certificate for the domain by running

        $ bin/letsencrypt.sh

   You may need to modify nginx's configuration and restart it to make the
   well-known file servable.  Be sure to copy the certificate and private
   key into the locations expected according to nginx's config.  Also, be
   sure to create a Diffie Hellman group, if not already done by that 
   script.

5. Start the production environment by doing 

        $ ./start.sh --prod



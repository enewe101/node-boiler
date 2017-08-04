# Get the path to this script, regardless of the current working directory
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"

# Create a key and certificate pair, and place them in the app directory, using
# a path relative to the location of this script
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout $SCRIPTPATH/../cert/privkey.pem -out $SCRIPTPATH/../cert/fullchain.pem -subj "/C=/ST=/L/O=/OU=/CN=/"

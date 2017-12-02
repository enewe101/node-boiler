SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
$SCRIPTPATH/self-sign-cert.sh
$SCRIPTPATH/mac-dev-localhost.sh

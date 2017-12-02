SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
$SCRIPT_PATH/self-sign-cert.sh
$SCRIPT_PATH/mac-dev-localhost.sh

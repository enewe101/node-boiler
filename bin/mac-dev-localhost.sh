#!/usr/bin/env bash
#
# This script prepares you to be able to access the website from the
# development server running on localhost.  First, it maps *.dev to localhost,
# so that navigatingn to this-projects-domain.dev will get mapped to localhost.
# Second, it makes the OS trust the self-signed certificate, and makes Chrome
# accept certificates that have a commonName but no subjectAlternativeName.
#

# Path to this script, to help build relative paths to places in this project
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"

# Use dnsmasq to help map *.dev to localhost
brew install dnsmasq
mkdir -pv $(brew --prefix)/etc
sudo cp -v $(brew --prefix dnsmasq)/homebrew.mxcl.dnsmasq.plist /Library/LaunchDaemons
sudo launchctl load -w /Library/LaunchDaemons/homebrew.mxcl.dnsmasq.plist
sudo mkdir -pv /etc/resolver

# Map *.dev to localhost
echo "address=/.dev/127.0.0.1" | sudo tee -a $(brew --prefix)/etc/dnsmasq.conf
echo "nameserver 127.0.0.1" | sudo tee /etc/resolver/dev

# Trust the self-signed dev certificate
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain $SCRIPTPATH/../cert/fullchain.pem

# Chrome should chill and accept certificates with only commonName on localhost
defaults write com.google.Chrome EnableCommonNameFallbackForLocalAnchors -bool true

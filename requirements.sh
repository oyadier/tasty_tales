#!/usr/bin/bash
# Install MongoDB on CentOS 7
sudo apt-get install gnupg curl
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod

# Insatall FastAPI and necessary dependencies
sudo apt update && sudo apt -y upgrade
pip install fastapi uvicorn pymongo python-dotenv python-multipart pyjwt 'passlib[bcrypt]' bson
#openssl rand -hex 32


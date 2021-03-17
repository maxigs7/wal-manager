#!/bin/bash
set -e

# MONGO_INITDB_ROOT_USERNAME & MONGO_INITDB_ROOT_PASSWORD to authenticate.
# MONGO_INITDB_DATABASE is the database name to be created.
# MONGO_INITDB_USERNAME is the username to be created.
# MONGO_INITDB_PASSWORD is the password for the user.

echo "------------------------------------------------"
echo "     Creating DB and User..."
echo "------------------------------------------------"
if [ -n "${MONGO_INITDB_ROOT_USERNAME:-}" ] && [ -n "${MONGO_INITDB_ROOT_PASSWORD:-}" ] && [ -n "${MONGO_INITDB_USERNAME:-}" ] && [ -n "${MONGO_INITDB_PASSWORD:-}" ] && [ -n "${MONGO_INITDB_DATABASE:-}" ]; then

  mongo -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD<<EOF
use $MONGO_INITDB_DATABASE;
db.createUser({
  user:  '$MONGO_INITDB_USERNAME',
  pwd: '$MONGO_INITDB_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_INITDB_DATABASE'
  }]
});
EOF

  echo "------------------------------------------------"
  echo "     DB and User were created succesfully"
  echo "------------------------------------------------"

else
    echo "------------------------------------------------"
    echo "    Error creating DB and User"
    echo "      ** Env variables missed **"
    echo "        - MONGO_INITDB_ROOT_USERNAME"
    echo "        - MONGO_INITDB_ROOT_PASSWORD"
    echo "        - MONGO_INITDB_USERNAME"
    echo "        - MONGO_INITDB_PASSWORD"
    echo "        - MONGO_INITDB_DATABASE"
    echo "------------------------------------------------"
    exit 403
fi
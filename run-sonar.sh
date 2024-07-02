#!/bin/bash

# Load .env variables
export $(grep -v '^#' .env | xargs)
cd src

# Execute scripts with .env variables
sonar-scanner -X -Dproject.settings=sonar-scanner.properties -Dsonar.login=$SONAR_LOGIN
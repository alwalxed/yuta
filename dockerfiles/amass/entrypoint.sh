#!/bin/bash

# usage instructions
print_usage() {
  echo "Usage: docker run alwalxed/amass amass <amass arguments>"
  echo "Example: docker run alwalxed/amass amass enum -d example.com"
}

# if no arguments
if [ $# -eq 0 ]; then
  print_usage
  exit 1
fi

# if the first argument is not "amass"
if [ "$1" != "amass" ]; then
  echo "Error: Only 'amass' commands are supported."
  print_usage
  exit 1
fi

# Run amass with arguments
exec amass "${@:2}"
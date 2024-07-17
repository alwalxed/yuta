#!/bin/bash

# usage instructions
print_usage() {
  echo "Usage: docker run alwalxed/subfinder subfinder <subfinder arguments>"
  echo "Example: docker run alwalxed/subfinder subfinder -h"
}

# if no arguments
if [ $# -eq 0 ]; then
  print_usage
  exit 1
fi

# if the first argument is not "subfinder"
if [ "$1" != "subfinder" ]; then
  echo "Error: Only 'subfinder' commands are supported."
  print_usage
  exit 1
fi

# Run subfinder with arguments
exec subfinder "${@:2}"
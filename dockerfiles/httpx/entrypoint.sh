#!/bin/bash

# usage instructions
print_usage() {
  echo "Usage: docker run alwalxed/httpx httpx <httpx arguments>"
  echo "Example: docker run alwalxed/httpx httpx -h"
}

# if no arguments
if [ $# -eq 0 ]; then
  print_usage
  exit 1
fi

# if the first argument is not "httpx"
if [ "$1" != "httpx" ]; then
  echo "Error: Only 'httpx' commands are supported."
  print_usage
  exit 1
fi

# Run httpx with arguments
exec httpx "${@:2}"
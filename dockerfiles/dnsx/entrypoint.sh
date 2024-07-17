#!/bin/bash

# usage instructions
print_usage() {
  echo "Usage: docker run alwalxed/dnsx dnsx <dnsx arguments>"
  echo "Example: docker run alwalxed/dnsx dnsx -h"
}

# if no arguments
if [ $# -eq 0 ]; then
  print_usage
  exit 1
fi

# if the first argument is not "dnsx"
if [ "$1" != "dnsx" ]; then
  echo "Error: Only 'dnsx' commands are supported."
  print_usage
  exit 1
fi

# Run dnsx with arguments
exec dnsx "${@:2}"
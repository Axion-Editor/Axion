#!/bin/bash

# Axion Build Script Wrapper
# This script provides an easy way to run builds

set -e

ANDROID=false
DEV=false
HELP=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --android|-a)
            ANDROID=true
            shift
            ;;
        --dev|-d)
            DEV=true
            shift
            ;;
        --help|-h)
            HELP=true
            shift
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

if [ "$HELP" = true ]; then
    echo "Usage: ./build.sh [options]"
    echo ""
    echo "Options:"
    echo "  --android, -a    Build for Android platform"
    echo "  --dev, -d        Build in development mode"
    echo "  --help, -h       Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./build.sh                 # Build web only"
    echo "  ./build.sh --android       # Build web and Android"
    echo "  ./build.sh --dev --android # Build in dev mode for Android"
    echo ""
    exit 0
fi

NODE_ARGS=""
if [ "$ANDROID" = true ]; then
    NODE_ARGS="$NODE_ARGS --android"
fi
if [ "$DEV" = true ]; then
    NODE_ARGS="$NODE_ARGS --dev"
fi

echo "Starting build process..."
node scripts/build.js $NODE_ARGS

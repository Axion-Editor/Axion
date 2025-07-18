#!/bin/bash

# Axion Run Script Wrapper
# This script provides an easy way to run the app

set -e

ANDROID=false
DEV=false
HELP=false
DEVICE=""

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
        --device=*)
            DEVICE="${1#*=}"
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
    echo "Usage: ./run.sh [options]"
    echo ""
    echo "Options:"
    echo "  --android, -a         Run on Android platform"
    echo "  --dev, -d             Build in development mode"
    echo "  --device=<device>     Specify device to run on (Android only)"
    echo "  --help, -h            Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./run.sh                         # Run web dev server only"
    echo "  ./run.sh --android               # Build and run on Android"
    echo "  ./run.sh --dev --android         # Build in dev mode and run on Android"
    echo "  ./run.sh --android --device=pixel # Run on specific Android device"
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
if [ -n "$DEVICE" ]; then
    NODE_ARGS="$NODE_ARGS --device=$DEVICE"
fi

echo "Starting run process..."
node scripts/run.js $NODE_ARGS

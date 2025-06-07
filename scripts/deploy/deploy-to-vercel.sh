#!/bin/bash

# Vercel Deployment Script
# This script deploys the frontend to Vercel

set -e

echo "🚀 Starting Vercel deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Set environment
ENVIRONMENT=${1:-production}
PROJECT_NAME="businessofone"

# Navigate to frontend directory
cd frontend

# Deploy based on environment
if [ "$ENVIRONMENT" = "production" ]; then
    echo "📦 Deploying to production..."
    vercel --prod --yes \
        --name $PROJECT_NAME \
        --token $VERCEL_TOKEN
elif [ "$ENVIRONMENT" = "staging" ]; then
    echo "📦 Deploying to staging..."
    vercel --yes \
        --name $PROJECT_NAME-staging \
        --token $VERCEL_TOKEN
else
    echo "❌ Unknown environment: $ENVIRONMENT"
    exit 1
fi

echo "✅ Deployment complete!"
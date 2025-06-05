#!/bin/bash

# Kubernetes Deployment Script
# This script deploys the application to a Kubernetes cluster

set -e

echo "🚀 Starting Kubernetes deployment..."

# Configuration
ENVIRONMENT=${1:-production}
IMAGE_TAG=${2:-latest}
NAMESPACE="businessofone-${ENVIRONMENT}"
DEPLOYMENT_NAME="businessofone-app"

# Check if kubectl is configured
if ! kubectl cluster-info &> /dev/null; then
    echo "❌ kubectl not configured or cluster not accessible"
    exit 1
fi

# Create namespace if it doesn't exist
echo "📁 Ensuring namespace exists..."
kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

# Update deployment with new image
echo "🐳 Updating deployment with image tag: $IMAGE_TAG"
kubectl set image deployment/$DEPLOYMENT_NAME \
    app=${DOCKER_REGISTRY}/businessofone:$IMAGE_TAG \
    -n $NAMESPACE

# Wait for rollout to complete
echo "⏳ Waiting for rollout to complete..."
kubectl rollout status deployment/$DEPLOYMENT_NAME -n $NAMESPACE

# Verify deployment
echo "✅ Verifying deployment..."
kubectl get pods -n $NAMESPACE -l app=$DEPLOYMENT_NAME

# Run post-deployment checks
echo "🔍 Running health checks..."
HEALTH_CHECK_URL=$(kubectl get ingress -n $NAMESPACE -o jsonpath='{.items[0].spec.rules[0].host}')/health

for i in {1..5}; do
    if curl -f -s https://$HEALTH_CHECK_URL > /dev/null; then
        echo "✅ Health check passed!"
        break
    else
        echo "⏳ Waiting for application to be ready... (attempt $i/5)"
        sleep 10
    fi
done

echo "🎉 Deployment complete!"
echo "📊 Deployment info:"
kubectl describe deployment/$DEPLOYMENT_NAME -n $NAMESPACE | grep -E "Image:|Replicas:"
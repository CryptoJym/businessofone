# CI/CD Pipeline Setup Guide

This guide walks you through setting up the CI/CD pipeline for the BusinessOfOne project.

## Prerequisites

- GitHub repository
- Docker Hub account (for container registry)
- Node.js project with tests

## Quick Start

### 1. Repository Setup

1. Push this code to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: add CI/CD pipeline configuration"
   git push origin main
   ```

2. Create a `develop` branch:
   ```bash
   git checkout -b develop
   git push origin develop
   ```

### 2. GitHub Secrets Configuration

Navigate to your repository Settings → Secrets and variables → Actions, then add:

#### Required Secrets
- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub password or access token

#### Optional Secrets
- `VERCEL_TOKEN`: For Vercel deployment
- `SLACK_WEBHOOK`: For Slack notifications
- `CODECOV_TOKEN`: For code coverage reports

### 3. GitHub Environments

1. Go to Settings → Environments
2. Create **staging** environment:
   - Name: `staging`
   - Environment URL: `https://staging.businessofone.com`
3. Create **production** environment:
   - Name: `production`  
   - Environment URL: `https://businessofone.com`
   - Add protection rules:
     - Required reviewers: 1
     - Restrict deployments to `main` branch

### 4. Enable GitHub Actions

1. Go to Settings → Actions → General
2. Under "Actions permissions", select "Allow all actions and reusable workflows"
3. Under "Workflow permissions", select "Read and write permissions"

### 5. Branch Protection Rules

1. Go to Settings → Branches
2. Add rule for `main` branch:
   - Require pull request reviews (1 approval)
   - Require status checks to pass:
     - `code-quality`
     - `test`
     - `build`
   - Require branches to be up to date
   - Include administrators

## Testing the Pipeline

### 1. Create a Test PR
```bash
git checkout -b test/ci-pipeline
echo "# Test" >> README.md
git add README.md
git commit -m "test: CI pipeline"
git push origin test/ci-pipeline
```

2. Create a pull request to `main` branch
3. Watch the checks run in the PR

### 2. Manual Workflow Run
1. Go to Actions tab
2. Select "CI/CD Pipeline"
3. Click "Run workflow"
4. Select branch and run

## Deployment Configuration

### For Vercel
```bash
# Add Vercel token to secrets
# Update .github/workflows/ci-cd-pipeline.yml deployment section:
- name: Deploy to Vercel
  run: bash scripts/deploy/deploy-to-vercel.sh ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
  env:
    VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

### For AWS/Kubernetes
```bash
# Add kubeconfig to secrets
# Update deployment section with:
- name: Deploy to Kubernetes
  run: bash scripts/deploy/deploy-to-k8s.sh ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }} ${{ github.sha }}
  env:
    KUBECONFIG: ${{ secrets.KUBECONFIG }}
    DOCKER_REGISTRY: ${{ secrets.DOCKER_USERNAME }}
```

## Monitoring

### Pipeline Status
- **Badge**: Add to README.md:
  ```markdown
  ![CI/CD Pipeline](https://github.com/YOUR_USERNAME/businessofone/workflows/CI%2FCD%20Pipeline/badge.svg)
  ```

### Notifications
- **Email**: Automatic for failures (GitHub default)
- **Slack**: Configure webhook in secrets

## Troubleshooting

### Common Issues

1. **"npm ci" fails**
   ```bash
   # Ensure package-lock.json exists
   npm install
   git add package-lock.json
   git commit -m "fix: add package-lock.json"
   ```

2. **Docker login fails**
   - Verify Docker Hub credentials
   - Use access token instead of password

3. **Tests fail in CI but pass locally**
   - Check Node.js version matches
   - Ensure all environment variables are set
   - Run tests with CI=true locally

## Next Steps

1. **Customize deployment scripts** in `scripts/deploy/`
2. **Add environment-specific configurations**
3. **Set up monitoring and alerts**
4. **Configure auto-scaling and rollback strategies**

## Support

For issues or questions:
1. Check [GitHub Actions logs](https://github.com/YOUR_USERNAME/businessofone/actions)
2. Review [pipeline documentation](./CI_CD_PIPELINE.md)
3. Check [GitHub Actions status](https://www.githubstatus.com/)
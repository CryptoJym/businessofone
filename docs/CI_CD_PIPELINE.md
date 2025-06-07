# CI/CD Pipeline Documentation

## Overview

This document describes the CI/CD pipeline implementation for the BusinessOfOne project. The pipeline is built using GitHub Actions and includes automated testing, building, security scanning, and deployment processes.

## Pipeline Architecture

### Workflow Files

1. **Main CI/CD Pipeline** (`.github/workflows/ci-cd-pipeline.yml`)
   - Triggered on push to `main` and `develop` branches
   - Triggered on pull requests to `main`
   - Can be manually triggered via workflow dispatch

2. **CodeQL Security Analysis** (`.github/workflows/codeql-analysis.yml`)
   - Runs security scans on JavaScript code
   - Scheduled weekly and on code changes

3. **Dependency Updates** (`.github/workflows/dependency-update.yml`)
   - Automated dependency updates
   - Runs weekly on Mondays

4. **Dependabot Configuration** (`.github/dependabot.yml`)
   - Monitors npm, Docker, and GitHub Actions dependencies
   - Creates automated pull requests for updates

## Pipeline Stages

### 1. Code Quality & Security
- **ESLint**: Code linting and style checking
- **npm audit**: Security vulnerability scanning
- **Dependency Check**: Third-party dependency analysis
- **CodeQL**: Advanced security analysis

### 2. Testing
- Runs tests on multiple Node.js versions (16.x, 18.x, 20.x)
- Generates coverage reports
- Uploads results to Codecov
- Creates JUnit test reports

### 3. Build
- Builds the application
- Creates optimized production bundles
- Stores build artifacts for deployment

### 4. Docker
- Multi-stage Docker build
- Pushes images to Docker Hub
- Tags images with branch names and commit SHAs

### 5. Deployment
- **Staging**: Automatic deployment from `develop` branch
- **Production**: Automatic deployment from `main` branch
- Uses GitHub Environments for approval workflows

### 6. Release Management
- Automatic changelog generation
- Semantic versioning
- GitHub Release creation

## Required Secrets

Configure these secrets in your GitHub repository settings:

### Docker Hub
- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub password or access token

### Deployment (Optional)
- `STAGING_DEPLOY_KEY`: SSH key or API token for staging deployment
- `PRODUCTION_DEPLOY_KEY`: SSH key or API token for production deployment
- `STAGING_HOST`: Staging server hostname
- `PRODUCTION_HOST`: Production server hostname

### Notifications (Optional)
- `SLACK_WEBHOOK`: Slack webhook URL for notifications

## Environment Setup

### GitHub Environments

Create two environments in your repository settings:

1. **staging**
   - URL: https://staging.businessofone.com
   - No protection rules (auto-deploy)

2. **production**
   - URL: https://businessofone.com
   - Protection rules:
     - Required reviewers
     - Restrict to `main` branch

## Local Development

### Running the Pipeline Locally

Install `act` to run GitHub Actions locally:

```bash
# Install act (macOS)
brew install act

# Run the CI/CD pipeline locally
act push --secret-file .env.secrets

# Run a specific job
act -j test
```

### Docker Build

```bash
# Build the Docker image
docker build -t businessofone:local .

# Run the container
docker run -p 3000:3000 businessofone:local

# Run with environment variables
docker run -p 3000:3000 -e NODE_ENV=production businessofone:local
```

## Deployment Strategies

### Staging Deployment

The staging environment automatically deploys when changes are pushed to the `develop` branch. The deployment process:

1. Builds and tests the code
2. Creates a Docker image tagged with `develop`
3. Deploys to staging infrastructure
4. Runs smoke tests

### Production Deployment

Production deployments occur when changes are merged to the `main` branch:

1. All tests must pass
2. Security scans must complete
3. Docker image is built and tagged
4. Requires manual approval (if configured)
5. Deploys to production infrastructure
6. Creates a GitHub release

## Monitoring and Alerts

### Pipeline Status
- Check Actions tab in GitHub for pipeline status
- Slack notifications sent on pipeline completion
- Email notifications for failed deployments

### Health Checks
- Docker container includes health check endpoint
- Monitors application availability
- Automatic container restarts on failure

## Troubleshooting

### Common Issues

1. **npm ci fails**
   - Ensure `package-lock.json` is committed
   - Check Node.js version compatibility

2. **Docker build fails**
   - Verify Dockerfile syntax
   - Check for missing dependencies
   - Ensure build context is correct

3. **Deployment fails**
   - Verify deployment secrets are set
   - Check deployment target accessibility
   - Review deployment logs

### Debug Mode

Enable debug logging in GitHub Actions:
1. Set secret `ACTIONS_RUNNER_DEBUG` to `true`
2. Set secret `ACTIONS_STEP_DEBUG` to `true`

## Best Practices

1. **Branch Protection**
   - Enable branch protection on `main`
   - Require PR reviews
   - Require status checks to pass

2. **Semantic Commits**
   - Use conventional commits for automatic versioning
   - Format: `type(scope): description`
   - Types: feat, fix, docs, style, refactor, test, chore

3. **Security**
   - Regularly update dependencies
   - Review Dependabot PRs promptly
   - Monitor security alerts

4. **Performance**
   - Use Docker layer caching
   - Optimize build steps
   - Parallelize independent jobs

## Maintenance

### Weekly Tasks
- Review and merge Dependabot PRs
- Check security scan results
- Monitor pipeline performance

### Monthly Tasks
- Review and update pipeline configuration
- Audit deployment permissions
- Update documentation

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Node.js Production Best Practices](https://github.com/goldbergyoni/nodebestpractices)
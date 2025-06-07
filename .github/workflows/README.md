# GitHub Copilot Conflict Resolution Automation

This directory contains GitHub Actions workflows that leverage GitHub Copilot to automatically resolve merge conflicts and keep PRs up to date.

## Workflows

### 1. Auto-Resolve Conflicts (`auto-resolve-conflicts.yml`)
- **Trigger**: On every PR update or manual dispatch
- **Function**: Detects merge conflicts and creates issues for Copilot to resolve them
- **Features**:
  - Automatic conflict detection
  - Creates detailed issues with merge instructions
  - Comments on PRs with status updates

### 2. Copilot Comment Trigger (`copilot-comment-trigger.yml`)
- **Trigger**: When someone comments `@copilot` commands on PRs
- **Commands**:
  - `@copilot resolve conflicts` - Manually trigger conflict resolution
  - `@copilot help` - Show available commands
- **Features**:
  - Interactive conflict resolution
  - Help documentation
  - Command acknowledgment

### 3. Proactive Rebase (`proactive-rebase.yml`)
- **Trigger**: Every 6 hours or manual dispatch
- **Function**: Keeps PRs up to date with their base branches
- **Features**:
  - Prevents conflicts before they happen
  - Automatic rebase scheduling
  - Progress notifications

## Configuration

### Merge Strategies (`copilot-merge-strategies.yml`)
Defines how Copilot should handle conflicts for different file types:

- **Package files**: Merge all dependencies, regenerate lock files
- **Config files**: Intelligent merging based on file type
- **Source code**: Preserve functionality from both branches
- **Documentation**: Combine content intelligently

## Setup Requirements

1. **GitHub Copilot Business License**: Required on the repository
2. **Permissions**: Workflows need write access to issues and PRs
3. **Branch Protection**: Consider rules for automated commits

## How It Works

1. **Conflict Detection**:
   - Workflow detects merge conflicts in PRs
   - Creates an issue assigned to Copilot
   - Copilot analyzes and resolves conflicts

2. **Smart Resolution**:
   - Uses file-specific merge strategies
   - Preserves functionality from both branches
   - Regenerates lock files automatically

3. **Continuous Updates**:
   - Proactive rebase keeps PRs current
   - Prevents conflicts before they occur
   - Maintains clean git history

## Best Practices

1. **Review Automated Merges**: While Copilot is intelligent, always review automated resolutions
2. **Custom Strategies**: Modify `copilot-merge-strategies.yml` for your specific needs
3. **Manual Override**: Use `@copilot` commands when automatic resolution needs guidance

## Troubleshooting

If Copilot automation isn't working:

1. Verify Copilot Business license is active
2. Check workflow permissions in repository settings
3. Ensure Copilot is enabled for the repository
4. Review workflow logs for specific errors

## Future Enhancements

- Conflict complexity scoring
- Custom merge strategies per PR
- Integration with code review workflows
- Metrics and reporting dashboard
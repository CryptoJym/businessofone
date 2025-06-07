# GitHub Copilot Merge Conflict Automation

This repository is configured with automated merge conflict resolution using GitHub Copilot Agent. When merge conflicts are detected, Copilot will automatically resolve them following project-specific strategies.

## 🚀 Features

### 1. **Automatic Conflict Detection**
- Monitors all PRs for merge conflicts
- Triggers when PRs are opened, synchronized, or when target branch is updated
- Creates issues assigned to Copilot for resolution

### 2. **Manual Conflict Resolution**
- Comment `@copilot resolve conflicts` on any PR
- Copilot will handle the merge conflicts
- Add specific instructions in your comment for custom handling

### 3. **Proactive Conflict Prevention**
- Runs every 6 hours to find PRs that are behind their target branch
- Automatically rebases them to prevent future conflicts
- Reduces the likelihood of complex conflicts

### 4. **Smart Resolution Strategies**
- File-specific merge strategies (see `.github/copilot-merge-strategies.yml`)
- Handles common patterns like package-lock.json intelligently
- Preserves functionality from both branches

## 📝 Usage

### Automatic Resolution
When a PR has merge conflicts:
1. The workflow automatically detects it
2. Creates an issue assigned to Copilot
3. Copilot resolves conflicts following the defined strategies
4. Updates the PR with resolved changes
5. Comments with a summary

### Manual Trigger
Comment on any PR with conflicts:
```
@copilot resolve conflicts
```

With specific instructions:
```
@copilot resolve conflicts
Please prioritize the changes from my feature branch
and ensure the API remains backward compatible
```

### Available Commands
- `@copilot resolve conflicts` - Resolve merge conflicts
- `@copilot fix conflicts` - Same as above
- `@copilot merge conflicts` - Same as above
- `@copilot help` - Shows available commands

## 🛠️ Configuration

### Merge Strategies
Edit `.github/copilot-merge-strategies.yml` to customize how different file types are handled:

- **package-lock.json** - Regenerates after merging package.json
- **.gitignore** - Combines entries from both branches
- **Test files** - Keeps tests from both branches
- **Source code** - Semantic merge preserving functionality

### Workflow Settings
- **Proactive rebase schedule**: Every 6 hours (configurable in `proactive-rebase.yml`)
- **PR limit**: Processes 10 PRs per run (configurable)
- **Dry run mode**: Available for testing

## 🏷️ Labels

The workflows use these labels:
- `merge-conflict` - PRs with active conflicts
- `copilot-task` - Issues assigned to Copilot
- `proactive-rebase` - PRs scheduled for rebasing
- `do-not-rebase` - Add to PR to skip automatic rebasing

## 🔧 Setup Requirements

1. **GitHub Copilot Agent** must be enabled for your repository
2. **Permissions**: Workflows need `issues: write` and `pull-requests: write`
3. **Branch protection**: Compatible with protected branches

## 📊 Monitoring

### Workflow Runs
- Check Actions tab for workflow execution
- Each run provides a summary of actions taken

### Issue Tracking
- All Copilot tasks create trackable issues
- Follow progress through issue comments

### PR Comments
- Automated comments keep you informed
- Reactions acknowledge command receipt

## 🚨 Troubleshooting

### Copilot doesn't respond
1. Ensure Copilot Agent is enabled
2. Check workflow permissions
3. Verify issue assignment to 'copilot'

### Conflicts not detected
1. Workflow only runs on PR events
2. Manual trigger with workflow_dispatch
3. Check mergeable_state in PR details

### Resolution fails
1. Check Copilot's issue comments
2. Complex conflicts may need manual intervention
3. Review merge strategy configuration

## 🔐 Security

- Workflows use minimal required permissions
- No credentials stored in workflows
- All actions are logged and auditable
- Copilot follows repository access controls

## 📈 Best Practices

1. **Keep PRs small** - Reduces conflict complexity
2. **Rebase frequently** - Use proactive rebase feature
3. **Clear commits** - Helps Copilot understand changes
4. **Test coverage** - Ensures safe conflict resolution
5. **Review Copilot's work** - Always review automated changes

## 🤝 Contributing

To improve conflict resolution:
1. Update strategies in `copilot-merge-strategies.yml`
2. Add new file patterns as needed
3. Test with dry-run mode first
4. Document any custom strategies

---

*Powered by GitHub Copilot Agent - Making merge conflicts a thing of the past! 🚀*
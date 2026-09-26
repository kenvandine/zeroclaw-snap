# Snap Agent Responsibilities

This snap is now maintained by [automated-ken](https://github.com/kenvandine/automated-ken), a self-hosted agentic snap-maintenance dashboard.

## Automated Responsibilities

- **Version Detection**: Automatically polls upstream for new releases
- **Version Bump PRs**: Opens PRs to update the pinned version when new releases are detected
- **CI Monitoring**: Monitors build workflows and asks Copilot cloud agent to fix failing builds (with follow-up PRs)
- **YARF Testing**: Runs YARF (Yet Another Release Framework) tests
- **Channel Promotion**: Manages promotion from edge -> candidate -> stable channels

## Important Notes

- **Do not hand-edit the pinned version** in package.json — automated-ken manages this
- The removed workflow's job (upstream release polling) is now automated-ken's responsibility
- All build/publish workflows now follow the canonical pattern defined in `.github/workflows/automated-snap-build.yml`

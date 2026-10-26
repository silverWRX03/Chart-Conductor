# Security policy

No Chart Conductor application release exists yet. The repository, its automation and dependencies are the current security surface. Future application controls described in the [threat model](docs/security/THREAT_MODEL.md) are intended controls, not implemented or tested protections.

## Report privately

Please do not publish exploit details or sensitive attachments in issues or PRs. The planned channel is [GitHub private vulnerability reporting](https://github.com/silverWRX03/Chart-Conductor/security/advisories/new).

**Enablement and that reporting link have not yet been verified.** The owner must enable private reporting and verify the signed-in reporting form before announcing it as available. If it is unavailable, ask the owner through a public issue only to enable a private channel; include no vulnerability details or attachments there.

Include the affected revision/version, Windows or other relevant platform, impact, prerequisites, expected/actual behavior and reproducible steps. Use synthetic or minimized reproductions instead of copyrighted songs, full lyrics or personal files. Never attach credentials, tokens, private paths or raw logs with user content.

This is volunteer work: response and remediation are best effort, without a response-time promise. Coordinate disclosure with the maintainer so a fix and advisory can be prepared. No bounty or blanket legal safe-harbor promise is offered.

## Scope

Current scope includes repository permissions, workflows, dependency compromise, accidental data disclosure and policy bypass. Future scope includes malicious media, archives, projects, models, dependencies, installers, updates and data loss. No supported application-version table applies until a release exists. See [repository security](docs/security/REPOSITORY_SECURITY.md) for pending settings and verification.

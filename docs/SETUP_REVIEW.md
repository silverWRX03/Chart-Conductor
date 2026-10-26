# Repository foundation review

Prepared 2026-10-26 for owner review. **No push or settings change is authorized by this handoff itself.**

## Proposed files

35 new tracked files: the 34 listed below, plus this review. No existing remote files were replaced.

### Root policies

- [.gitattributes](../.gitattributes)
- [.gitignore](../.gitignore)
- [.markdownlint.json](../.markdownlint.json)
- [AGENTS.md](../AGENTS.md)
- [CHANGELOG.md](../CHANGELOG.md)
- [CLAUDE.md](../CLAUDE.md)
- [CONTRIBUTING.md](../CONTRIBUTING.md)
- [LICENSE](../LICENSE)
- [README.md](../README.md)
- [ROADMAP.md](../ROADMAP.md)
- [SECURITY.md](../SECURITY.md)
- [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md)

### GitHub configuration

- [.github/CODEOWNERS](../.github/CODEOWNERS)
- [.github/ISSUE_TEMPLATE/bug_report.yml](../.github/ISSUE_TEMPLATE/bug_report.yml)
- [.github/ISSUE_TEMPLATE/config.yml](../.github/ISSUE_TEMPLATE/config.yml)
- [.github/ISSUE_TEMPLATE/feature_request.yml](../.github/ISSUE_TEMPLATE/feature_request.yml)
- [.github/PULL_REQUEST_TEMPLATE.md](../.github/PULL_REQUEST_TEMPLATE.md)
- [.github/dependabot.yml](../.github/dependabot.yml)
- [.github/workflows/codeql.yml](../.github/workflows/codeql.yml)
- [.github/workflows/repository-validation.yml](../.github/workflows/repository-validation.yml)

### Project documentation

- [docs/LEGAL_AND_LICENSING.md](LEGAL_AND_LICENSING.md)
- [docs/PRIVACY.md](PRIVACY.md)
- [docs/PROJECT_CHARTER.md](PROJECT_CHARTER.md)
- [docs/REPOSITORY_SETUP.md](REPOSITORY_SETUP.md)
- [docs/TESTING.md](TESTING.md)
- [docs/decisions/README.md](decisions/README.md)
- [docs/security/REPOSITORY_SECURITY.md](security/REPOSITORY_SECURITY.md)
- [docs/security/THREAT_MODEL.md](security/THREAT_MODEL.md)

### Fixture policy

- [tests/fixtures/README.md](../tests/fixtures/README.md)
- [tests/fixtures/rights.json](../tests/fixtures/rights.json)

### Repository maintenance

- [tools/repository/package-lock.json](../tools/repository/package-lock.json)
- [tools/repository/package.json](../tools/repository/package.json)
- [tools/repository/validate.mjs](../tools/repository/validate.mjs)
- [tools/repository/validate.test.mjs](../tools/repository/validate.test.mjs)

## Local verification

Windows maintenance environment: Node.js 24.21.0, npm 11.19.0, markdownlint-cli2 0.24.0, markdownlint 0.42.0, yaml 2.9.1 and actionlint 1.7.12.

| Check | Result |
| --- | --- |
| Clean npm ci --ignore-scripts from lockfile | Passed; 90 development packages installed |
| npm audit | Passed; zero reported vulnerabilities |
| Repository policy/license/internal-link/YAML/form/workflow/data checks | Passed |
| Validator suite | 14 passed, zero failed; includes rejection of missing policies, broken links, malformed YAML/forms, mutable Actions, persisted credentials, tracked media, unlisted fixtures, token patterns, altered license and wrong CodeQL language |
| Markdown lint | Passed; zero findings |
| Official actionlint on both workflows | Passed; zero findings |
| Git staged whitespace check | Passed |
| Diff/inventory review | Only intended policies, fixtures policy, configuration and maintenance code; no user media, model weights, credentials or unrelated source included |

A low-severity transitive KaTeX advisory was found and addressed with the documented 0.18.2 override; the final locked tree audits cleanly. Recognizable-secret checks and review do not prove absence of all secrets.

## Approval requested

Approve one consolidated remote setup: recheck that the repository is still empty, create the initial commit on main without force, allow the two prepared workflows to run, then apply and verify the exact [repository settings plan](security/REPOSITORY_SECURITY.md). Required check contexts are added only after successful real runs. The sole owner is not required to obtain an approving review from themselves.

The bootstrap direct initial push is needed because an empty repository has no base branch for a PR. After bootstrap, use PRs with required passing checks and zero required approving reviews. No merge, release, deployment, Pages or package publication is requested.

## Pending and not verified

Private vulnerability reporting and its signed-in form, secret scanning/push protection, Dependabot alert settings, Actions defaults/allowlist/fork policy, auto-merge disabled, main protection, CodeQL default-setup state, GitHub workflow results and SARIF ingestion remain unverified. No remote settings have been changed. The exposed connector has no settings administration operations and sandboxed gh cannot read its protected configuration; an authorized signed-in settings session may be needed. See [the setup record](REPOSITORY_SETUP.md).

No application functionality has been implemented. No application tests, YARG compatibility tests, audio tests, installer tests or owner playtests were run. Repository checks provide no application security or legal clearance. The next pending planning decision is owner confirmation/revision of the five [proposed exclusions](PROJECT_CHARTER.md#proposed-exclusions--owner-confirmation-required), followed by the Stage 1 acceptance specification. Application architecture remains open.

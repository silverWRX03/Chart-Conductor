# Repository security plan

Settings below are proposed until verified. No settings were changed during preparation.

## Workflows and supply chain

[Repository validation](../../.github/workflows/repository-validation.yml) runs only repository checks on hosted Ubuntu runners, with read-only permissions, no secrets, no artifact upload, bounded time and concurrency. Checkout disables persisted credentials. No privileged PR trigger, self-hosted runner, user-media execution, release, package, Pages or deployment job is included. Do not insert untrusted titles, branches or PR text into shell scripts.

[CodeQL](../../.github/workflows/codeql.yml) scans **Actions only**, a currently supported CodeQL language. It does not scan a nonexistent application. Only its analysis job requests security-events write for SARIF upload; fork PR tokens remain restricted by GitHub. Standard pull_request code scanning is supported by GitHub; do not enable write tokens or secrets for forks. Default CodeQL setup must remain disabled when this advanced workflow is used. Verify successful ingestion after bootstrap; a prepared YAML file is not a scan result.

External Actions are pinned to full commit SHAs, resolved using GitHub's refs API on 2026-10-26:

| Action | Reference inspected | Commit |
| --- | --- | --- |
| actions/checkout | v7 | 3d3c42e5aac5ba805825da76410c181273ba90b1 |
| github/codeql-action | v4 (annotated tag dereferenced) | 9b3254085494b55a0f7c4c2b3d2d52cc712ce370 |

Dependabot checks Actions weekly and the real npm maintenance manifest weekly. No application ecosystem is configured. Node/npm tools live under tools/repository and do not select the application stack. Lockfile integrity values and npm ci --ignore-scripts constrain package installation; review updates and notices. The hosted runner's preinstalled Node/npm are platform-managed rather than reproducibly pinned. Review runner-image changes and tool versions when diagnosing differences.

actionlint v1.7.12 is downloaded from its official release and checked against a fixed SHA-256 before execution. Linux amd64: 8aca8db96f1b94770f1b0d72b6dddcb1ebb8123cb3712530b08cc387b349a3d8. Windows amd64 ZIP: 6e7241b51e6817ea6a047693d8e6fed13b31819c9a0dd6c5a726e1592d22f6e9. Both were compared with the release checksum file. Dependabot does not update this download; review its version/checksum manually with workflow changes.

## Settings proposed for approval

1. Enable/verify private vulnerability reporting, secret scanning, repository push protection and Dependabot alerts/security updates where available free.
2. Set Actions default workflow permissions to read-only and disallow Actions creating/approving PRs. Keep fork write tokens and fork secrets disabled. Require approval for all external contributors' workflow runs. Use hosted runners only.
3. Restrict Actions to actions/checkout and github/codeql-action (including init/analyze); require full SHA pinning if that setting is available. The in-repository check enforces pins regardless.
4. Disable auto-merge. Workflow and policy changes get explicit owner inspection; CODEOWNERS routes ownership but cannot supply independent review for its own author.
5. Protect main against deletion and force pushes. After real successful checks exist, require PRs, up-to-date branches and the **Repository checks** and **Analyze Actions** checks. Require conversation resolution. Require **zero** approving reviews and no mandatory code-owner approval: the solo owner cannot approve their own PR. No routine bypass actors.

## Empty-repository bootstrap

There is no branch to protect yet. After owner approval, create the initial main commit once, without force or history rewriting. This direct initial push is the narrow bootstrap exception. Run repository validation and CodeQL, inspect exact check names/app identity, then apply main protection requiring the observed successful checks. Do not invent contexts or activate required checks before they exist. If a check fails, fix it on a branch and review; do not claim bootstrap complete.

The target merge process after bootstrap is a PR that the owner inspects and merges after checks pass; a second reviewer is not required. Review workflow diffs before allowing external workflows to run. No release/publishing permission is implied.

## Feature availability and limitations

GitHub documents free public-repository secret scanning/push protection, CodeQL and private reporting. Availability is not proof a particular setting is enabled. Pattern-based scanners do not find all secrets or unauthorized media. Dependency alerts cover recognized ecosystems, not every codec/model/binary. Repository checks supplement human review and cannot certify application security.

Current connection reports admin permissions, but exposed connector tools do not provide settings mutation or all settings reads. Local GitHub CLI configuration is inaccessible in this sandbox. Unverified settings therefore require an authenticated owner settings session or an appropriate administrative API connection after approval. Do not request a paid plan.

Primary references: [GitHub security features](https://docs.github.com/en/code-security/getting-started/github-security-features), [CodeQL languages](https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-code-scanning), [private reporting](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/configure-vulnerability-reporting/configure-for-a-repository), and [AGPL terms](https://www.gnu.org/licenses/agpl-3.0.html).

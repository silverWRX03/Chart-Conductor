# Repository setup record

Inspected 2026-10-26. This record distinguishes observed facts, locally prepared files and unverified remote controls.

## Observed

| Item | Evidence / state |
| --- | --- |
| Repository | silverWRX03/Chart-Conductor, public; repository ID 1434555013 |
| Default branch | main reported by repository API |
| Initial commit | None: contents API reports “This repository is empty”; branches API returns an empty list |
| Existing policy/license/workflow files | None in the empty repository; nothing overwritten |
| Repository rulesets | API returns an empty list; no branch exists for a branch-protection check |
| Permissions | Connected GitHub account reports admin, maintain, push, pull and triage |
| Pages | has_pages is false; no Pages setup is requested |
| Local preparation | work/Chart-Conductor beneath this task workspace; initialized local setup/repository-foundation branch, no remote push |
| Working tree at start | Newly created empty local repository; no unrelated edits |
| Reference | Craft Conductor main policies, testing guidance, dependency updates, workflows, changelog and GPL license inspected read-only |

No source clone could be fetched through local git because shell network access is restricted. The GitHub connector verified the remote state. The local git repository represents a proposed initial tree, not fetched remote history. Recheck remote emptiness immediately before any approved initial push; preserve intervening work if it appears.

Craft Conductor's root ROADMAP.md was not found; this is not proof it has no roadmap elsewhere. Its useful practices were adapted as original prose, without copying architecture, branding, release/network features or substantial licensed text.

## Prepared locally

Project/contributor/assistant policies, AGPL license/notice, planning, privacy/legal/security guidance, testing and fixture rights policy, issue/PR forms, CODEOWNERS, ignore rules, maintenance tooling/lockfile, weekly Dependabot, repository validation and Actions-only CodeQL. The file list and actual local results will be supplied in the handoff.

No application functionality, architecture, language, UI, storage engine, model, installer, website, release or deployment is implemented or selected. Repository-maintenance Node tooling is not an application decision.

## Pending owner approval and verification

Follow the exact [settings and bootstrap plan](security/REPOSITORY_SECURITY.md). All of these remain **unverified**, not “enabled”:

- Private vulnerability reporting and signed-in reporting form at [the reporting form](https://github.com/silverWRX03/Chart-Conductor/security/advisories/new).
- Secret scanning, repository push protection, Dependabot alerts/security updates and dependency graph.
- Actions defaults/allowlist, external-contributor approvals and fork token restrictions.
- Auto-merge disabled and main protection after bootstrap.
- CodeQL default setup disabled, advanced workflow run and SARIF ingestion.
- First GitHub workflow outcomes and required-check names/app identity.

The connected toolset cannot administer these settings; local gh cannot read its protected configuration. An authorized settings session is needed for those operations. No remote setting has been changed and no remote commit, PR, release, merge, deployment or Pages publication was created during local preparation.

## Next planning decision

Ask the owner to confirm/revise the five proposed exclusions in [the charter](PROJECT_CHARTER.md), then approve a Stage 1 acceptance specification. Do not implement features or choose application architecture before those decisions. Repository checks do not provide application security or legal clearance.

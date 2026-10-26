# Contributing

The application is not implemented. Start with the [charter](docs/PROJECT_CHARTER.md) and [open decisions](docs/decisions/README.md).

Use the repository's [issue forms](https://github.com/silverWRX03/Chart-Conductor/issues/new/choose) for ordinary bugs and ideas. Describe the affected revision, expected and actual behavior, platform and sanitized reproduction. Report vulnerabilities privately as described in [SECURITY.md](SECURITY.md); do not put exploit details in public issues.

Propose small, reviewable changes. Explain scope and evidence in the PR template. Update related docs and the unreleased [changelog](CHANGELOG.md). Preserve unrelated work and original inputs. Ask before resolving consequential open choices.

## Local repository checks

Node.js 24 and npm are used only for repository maintenance. They do not select the application's implementation language. From the repository root:

```sh
npm ci --ignore-scripts --prefix tools/repository
node tools/repository/validate.mjs
node --test tools/repository/validate.test.mjs
npm run lint --prefix tools/repository
actionlint -shellcheck= -pyflakes=
```

Install actionlint from its [official releases](https://github.com/rhysd/actionlint/releases), verify its published SHA-256 checksum, and place it on PATH. The pinned CI version is recorded in [repository security](docs/security/REPOSITORY_SECURITY.md). Shellcheck and pyflakes are disabled because no shell scripts containing variable expressions or Python snippets are used; actionlint still validates workflow structure and expressions. See [Testing](docs/TESTING.md) for evidence limits.

## Dependencies, media and rights

Review every proposed dependency, codec, model and weight before adoption: license, source, redistribution, compatibility, integrity, maintenance and security. Follow [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Do not assume separate processes or downloads settle licensing.

Never commit credentials, user songs, full lyrics, private paths, personal projects, exports, model caches or raw logs. Use synthetic or appropriately licensed fixtures only in [tests/fixtures](tests/fixtures/README.md), with explicit file-level rights records. GitHub is development infrastructure, never an application backend. Do not upload user material to issues or Actions to reproduce bugs.

Contributions are under AGPL-3.0-or-later, with third-party licenses/notices preserved. No contributor agreement or copyright assignment is required. Do not contribute material you cannot license. Record only tests actually performed and preserve previous results; no invented PASS results or inherited playtest passes.

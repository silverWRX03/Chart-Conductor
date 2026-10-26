# Third-party licensing policy and notices

No application dependency, codec, model or weight is adopted by this setup. Maintenance dependencies are development tools only; their exact versions, integrity values and transitive packages are in [the maintenance lockfile](tools/repository/package-lock.json). Preserve their package license files during installation and review updates.

Before adopting any third-party material, record its exact name/version, upstream URL and commit or checksum, copyright, SPDX expression or complete license, required notices, redistribution conditions, source-offer obligations and compatibility analysis. Models and weights need their own review, including use/redistribution restrictions and provenance; do not infer their terms from the inference code's license.

Review codecs, native binaries, bundled assets and transitive components individually. Subprocess boundaries and separate downloads do not automatically settle whether a combined distribution is compliant. Unclear or incompatible terms block adoption pending owner decision and, when needed, qualified advice.

Before distribution, add an entry for every shipped component and include required notices/source offers. A package lockfile is an inventory aid, not legal clearance. User music, lyrics, artwork and generated charts have separate rights; the software license grants none of those rights.

The [LICENSE](LICENSE) contains the complete GNU AGPL v3 text, reproduced from the [SPDX license-list data](https://github.com/spdx/license-list-data/blob/main/text/AGPL-3.0-or-later.txt); authoritative terms are published by the [Free Software Foundation](https://www.gnu.org/licenses/agpl-3.0.html). No substantial Craft Conductor text/code was copied: its current policies were inspected as a read-only organizational reference (GPL-3.0-or-later).

## Maintenance tools reviewed

| Tool | Version/reference | License | Role |
| --- | --- | --- | --- |
| markdownlint-cli2 | 0.24.0 | MIT | Markdown checks |
| yaml | 2.9.1 | ISC | YAML parsing |
| KaTeX (transitive override) | 0.18.2 | MIT | Markdown parser dependency |
| actionlint | 1.7.12 | MIT | Workflow lint |
| actions/checkout | v7 pinned commit | MIT | CI source checkout |
| github/codeql-action | v4 pinned commit | MIT; CodeQL tooling has separate terms | Workflow analysis on this public repository |

KaTeX is overridden to 0.18.2 to address GHSA-238p-pmpm-9mq7 in the linter dependency tree. The updated tree is locked and lint-validated; do not remove the override until upstream constraints allow a fixed version. CodeQL use here is for the public open-source repository, not a grant to redistribute its separately downloaded analysis tools. No development tool is bundled into an application by this setup.

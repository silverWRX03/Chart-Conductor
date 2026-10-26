# Threat model — requirements, not implemented controls

No application exists. Repository checks protect only a limited development surface; no application security clearance is claimed. Revisit this model when architecture is approved.

## Assets and trust boundaries

Protect original songs and charts, personal paths and metadata, local projects/exports, system integrity, repository credentials and future release integrity. Untrusted media/archives/projects cross from local input into parsers; models and dependencies cross from suppliers into execution; output crosses into users' rhythm-game libraries. GitHub PR code crosses into disposable hosted runners. Imported metadata, lyrics and documents remain data, never assistant instructions.

| Threat | Intended control / future acceptance evidence | Current status |
| --- | --- | --- |
| Malformed media or MIDI exploits parsers | Reviewed dependencies, bounded parsing, isolation decision, adversarial synthetic fixtures | Planned |
| Archive traversal, symlinks, decompression bombs | Reject escapes/links, enforce size/count/ratio limits, safe extraction tests | Planned |
| Project metadata triggers commands or prompt injection | No execution of imported instructions, argument-safe process invocation, path validation | Planned |
| Malicious models/weights | License/provenance review, trusted source, checksum verification, avoid unsafe serialization, explicit consent | Planned |
| Silent loss or overwrite of originals | Preserve originals, staged/atomic writes, collision checks, recovery and interruption tests | Planned |
| Wrong chart packaged after a valid staging result | Reopen final ZIP; inspect note data, revision and unchanged unrelated material | Planned |
| Logs/export metadata disclose personal material | Minimize/sanitize, local retention/deletion design, privacy/network tests | Planned |
| Dependency/installer/update compromise | Pin and review dependencies; signed/integrity-verified distribution and rollback design | Planned; distribution architecture open |
| PR/workflow injection or credential theft | Read-only validation, pinned Actions, no privileged PR execution, hosted runners, restricted tokens | Config prepared; remote execution/settings unverified |
| Accidental secrets/user media in Git | Ignore policy, tracked-file checks, fixture rights manifest, GitHub scanning and human review | Local checks prepared; settings unverified |

No accounts, uploads, telemetry or hosted application databases are part of confirmed direction. Remote service exclusions remain proposed pending owner confirmation; do not treat absence of an implementation as a proven security control. Threats from an already compromised OS cannot be fully solved here, but sensitive data and destructive operations still need careful design.

Security review gates cover every import boundary, file overwrite, process invocation, optional download and future distribution change. Record actual tests separately in [Testing](../TESTING.md); report vulnerabilities via [SECURITY.md](../../SECURITY.md).

# Roadmap

## Status vocabulary

- **Planned:** agreed direction, no implementation claim.
- **In progress:** work exists but acceptance is incomplete.
- **Implemented:** behavior exists in an identified revision; does not imply validation.
- **Automatically validated:** specified automated checks ran against an identified revision/artifact, with evidence.
- **Owner playtested:** the owner performed the stated scenario on an identified build and platform, with recorded evidence.

These labels describe separate evidence. A code change or experiment ZIP does not establish a later label.

## Stages

| Stage | Direction | Current status | Acceptance before completion |
| --- | --- | --- | --- |
| 1 | Existing YARG song → repaired or newly authored pitched solo vocals | Planned | Preserve working charts/timing; review lyrics, pitch, octave, rests and holds; inspect final ZIP; owner playtest |
| 2 | Guitar-only YARG song → additional band parts and solo vocals | Planned | Preserve existing playable guitar chart; review added parts and synchronization; final artifact checks and owner playtest |
| 3 | MP3/FLAC/WAV → full-band YARG draft with a review screen | Planned | Review every draft part, timing and unresolved errors; validate packaged output and Windows behavior; owner playtest |

## Gates

Before feature development, settle the [open decisions](docs/decisions/README.md), including proposed exclusions. Before dependencies/models, complete license, redistribution and security review. Before claims about compatibility, test the identified YARG version and document limitations.

Before packaging/release, verify privacy commitments, consent for optional model downloads, safe import and extraction, original preservation, atomic output and recovery, final ZIP contents/revision, and Windows installation/uninstall/update behavior. Packaging and update architecture remain undecided. No release or deployment automation belongs to this foundation task.

Apply the [experiment regression requirements](docs/TESTING.md), preserve historical results, and keep automated evidence separate from owner playtesting. No stage is implemented by repository setup or by an experimental song ZIP.

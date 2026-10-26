# Chart Conductor — Play the Music You Love!

A free, local tool being developed to help turn your music into playable charts for your personal rhythm-game library.

**The application is not implemented yet.** This repository contains project policies, planning and repository checks. Repository setup and song experiments are not a working product release. No download is available.

Chart Conductor is planned as a free, open-source Windows application for people who want to chart their own local music, across all genres. Initial work will focus on YARG compatibility; compatibility has not been demonstrated by an application release.

## Planned stages

1. Existing YARG song → repaired or newly authored pitched solo vocals, preserving working charts and timing.
2. Guitar-only YARG song → additional band parts and solo vocals, preserving the existing playable guitar chart.
3. MP3/FLAC/WAV → full-band YARG draft with a review screen.

All three stages are **Planned**. See the [roadmap](ROADMAP.md) for acceptance gates and status definitions.

## Privacy commitments

The official application will process and store material locally: no hosted databases, accounts, login, telemetry, or song, lyric, stem, project or library uploads. No required paid API, subscription, cloud inference or chat assistant. Optional model downloads require informed consent. Local files versus a local database remains undecided. These are product commitments, not claims about implemented controls; see [Privacy](docs/PRIVACY.md).

## Participate

- [Project charter](docs/PROJECT_CHARTER.md) and [open decisions](docs/decisions/README.md).
- [Contributing](CONTRIBUTING.md), [testing and evidence](docs/TESTING.md), and [changelog](CHANGELOG.md).
- [Private security reporting](SECURITY.md) and [threat model](docs/security/THREAT_MODEL.md).
- [Repository setup and pending settings](docs/REPOSITORY_SETUP.md).

## License and music rights

Copyright (C) 2026 silverWRX03 and contributors.

SPDX-License-Identifier: AGPL-3.0-or-later

Chart Conductor is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

It is distributed without any warranty; see the complete [LICENSE](LICENSE). Official releases will remain free. The AGPL permits third parties to charge for compliant distribution. Official product scope adds no restrictions to AGPL recipients.

The software does not grant rights to music, lyrics, artwork, models or generated charts. Possessing a local music file does not establish copyright ownership. See [Legal and licensing](docs/LEGAL_AND_LICENSING.md) and the [third-party policy](THIRD_PARTY_NOTICES.md).

Chart Conductor is not affiliated with or endorsed by YARG, Harmonix, Rock Band or any artist.

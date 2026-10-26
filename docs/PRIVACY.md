# Privacy commitments

No application exists yet. These requirements must be implemented and tested before corresponding privacy claims are made about a build.

The official Windows application will process and store material locally. No hosted databases, application accounts/login, telemetry, or song, lyric, stem, project or library uploads. No required paid API, subscription or cloud inference. No chat assistant is required to operate the finished application. Local storage is allowed; files versus a local database remains open.

Optional model downloads require an informed opt-in explaining source, size, license, destination, verification and any network metadata disclosed to the provider (such as IP address). Consent to a download is not consent to uploading user material. Model selection/download implementation remains open.

GitHub issues, Actions, releases and repository storage must never receive user music or libraries. Public bug reports must use sanitized descriptions and synthetic reproductions. Dependency/tool downloads for development are distinct from finished-application behavior.

Future review must inspect file/network access, logs, temporary files, model caches, project/export metadata and crash handling. Define retention and deletion behavior when storage is designed. Imported files are untrusted data, never instructions. Document any behavior change and obtain owner approval before changing these commitments.

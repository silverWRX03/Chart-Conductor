# Testing and evidence

## Repository checks now

Run the commands in [Contributing](../CONTRIBUTING.md). They check policy presence/license consistency, Markdown formatting, internal file/heading links, YAML, issue forms, workflow policy, forbidden tracked data and recognizable secret patterns. actionlint validates workflow syntax/expressions. These are repository checks, never application tests.

Limits: pattern scans can miss secrets and unauthorized material; `.gitignore` does not protect tracked files, issue uploads or all accidental data. Human review and GitHub scanning complement these checks. No runtime, packaging, compatibility or Windows application tests exist yet. CodeQL Actions analysis must run on GitHub before results can be claimed.

## Evidence rules

Record date, exact revision, command/scenario, platform/tool versions, outcome and sanitized evidence. Mark not-run, blocked and failed honestly. Separate automated checks, final-artifact inspection and owner playtesting. Keep historical runs; never overwrite earlier evidence, infer a pass from a fix or inherit passes into a new build. Do not publish raw personal logs or user content.

## Experiment lessons — future regressions

These are sanitized observations, not application acceptance results:

- Missing lyrics must never be silently dropped when pitch tracking fails.
- Vocal holds must not extend through real rests.
- Whole-song lyric ordering must survive repeated choruses.
- Harmonic and octave errors need explicit review.
- Original instrument tracks must be preserved when promised.
- Romanization is an optional separate export, not a guaranteed YARG font fix.
- A validated staging file does not prove the final ZIP contains it.

One experiment corrected a vocal “I” from MIDI 79 to MIDI 53. An intermediate packaging step then copied the old chart over the correction. The delivered ZIP still contained the wrong pitch.

Future acceptance must reopen the **final ZIP**, verify the actual packaged note is MIDI 53 at the designated synthetic event, verify revision identity, and compare unrelated material with the original (byte equality where promised; semantic comparison only when explicitly justified). A staging check alone must fail this regression. Implement a synthetic reproduction later; no copyrighted audio or experimental song ZIP is included now.

Future Stage 1 tests must cover rests/holds, lyric completeness/order, repeated choruses, octave/harmonic review and preservation of timing/instrument data. Later stages add part coverage, draft review and full-band packaging. Before release, test the exact artifact on Windows and the specified YARG version, including installation/uninstall/update and interruption/data-loss scenarios. No such results are currently claimed.

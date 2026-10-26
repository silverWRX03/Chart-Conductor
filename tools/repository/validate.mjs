// SPDX-License-Identifier: AGPL-3.0-or-later
// Development-only repository validation; no application stack is selected.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { parseDocument } from 'yaml';

export const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export function trackedFiles(root) {
  return execFileSync('git', ['-c', 'safe.directory=' + root.replaceAll('\\', '/'),
    'ls-files', '-z'], { cwd: root, encoding: 'utf8' }).split('\0').filter(Boolean);
}
export function validate(root, files) {
  const errors = [];
  const fail = (message) => errors.push(message);
  const set = new Set(files);
  const text = (p) => fs.readFileSync(path.join(root, p), 'utf8');
  const required = [
    'README.md', 'LICENSE', 'AGENTS.md', 'CLAUDE.md', 'CONTRIBUTING.md', 'SECURITY.md',
    'ROADMAP.md', 'CHANGELOG.md', 'THIRD_PARTY_NOTICES.md', '.gitignore', '.gitattributes',
    'docs/PROJECT_CHARTER.md', 'docs/PRIVACY.md', 'docs/LEGAL_AND_LICENSING.md',
    'docs/TESTING.md', 'docs/decisions/README.md', 'docs/REPOSITORY_SETUP.md',
    'docs/security/THREAT_MODEL.md', 'docs/security/REPOSITORY_SECURITY.md',
    '.github/CODEOWNERS', '.github/PULL_REQUEST_TEMPLATE.md', '.github/dependabot.yml',
    '.github/ISSUE_TEMPLATE/bug_report.yml', '.github/ISSUE_TEMPLATE/feature_request.yml',
    '.github/ISSUE_TEMPLATE/config.yml', '.github/workflows/repository-validation.yml',
    '.github/workflows/codeql.yml', 'tests/fixtures/README.md', 'tests/fixtures/rights.json',
    'tools/repository/package.json', 'tools/repository/package-lock.json'
  ];
  for (const p of required) if (!set.has(p)) fail('Required file missing from index: ' + p);
  if (errors.length) return errors;

  const license = text('LICENSE').replaceAll('\r\n', '\n');
  if (createHash('sha256').update(license).digest('hex') !==
    'd8a6cc31abc16b6748c7a21f21611f5a1ec33f67d22ca23d7da1c19b95496bee')
    fail('LICENSE differs from the complete upstream AGPL text');
  for (const p of ['README.md', 'docs/LEGAL_AND_LICENSING.md']) {
    if (!text(p).includes('SPDX-License-Identifier: AGPL-3.0-or-later')) fail('Missing license identifier: ' + p);
  }
  if (!/either version 3[\s\S]*any later version/.test(text('README.md')))
    fail('README must include the version 3 or later grant');
  for (const p of ['tools/repository/package.json', 'tools/repository/package-lock.json']) {
    const data = JSON.parse(text(p));
    if (data.license !== 'AGPL-3.0-or-later' &&
      data.packages?.['']?.license !== 'AGPL-3.0-or-later') fail('Wrong maintenance license: ' + p);
  }

  // Exact fixture allowlist; no media or archives are implicitly trusted.
  const rights = JSON.parse(text('tests/fixtures/rights.json'));
  if (rights.schemaVersion !== 1 || !Array.isArray(rights.files)) fail('Invalid fixture rights manifest');
  const allowed = new Set();
  for (const item of rights.files || []) {
    if (!item || typeof item.path !== 'string' || item.path.startsWith('/') ||
      item.path.includes('..') || item.path.includes('\\') || allowed.has(item.path)) {
      fail('Invalid or duplicate fixture path'); continue;
    }
    allowed.add(item.path);
    for (const key of ['source', 'creator', 'license', 'redistribution', 'purpose'])
      if (typeof item[key] !== 'string' || !item[key].trim()) fail('Incomplete fixture rights: ' + item.path);
    const full = 'tests/fixtures/' + item.path;
    if (!set.has(full)) fail('Fixture manifest references untracked file: ' + full);
    else if (!/^[a-f0-9]{64}$/.test(item.sha256 || '') ||
      createHash('sha256').update(fs.readFileSync(path.join(root, full))).digest('hex') !== item.sha256)
      fail('Fixture checksum mismatch: ' + full);
  }

  const forbiddenDir = /(^|\/)(user-data|songs|stems|lyrics|artwork|projects|exports|models|model-cache|logs|tmp|build|dist|node_modules|\.cache|\.venv|__pycache__)(\/|$)/i;
  const sensitive = /(^|\/)(\.env(?:\..*)?|id_rsa|id_ed25519)$|\.(?:log|db(?:-.*)?|sqlite\d?(?:-.*)?|pem|key|pfx|p12)$/i;
  const dataExt = /\.(mp3|flac|wav|ogg|opus|m4a|aac|aiff|wma|mp4|webm|mid|midi|chart|zip|7z|rar|tar|gz|jpg|jpeg|png|webp|gif|svg|srt|lrc|safetensors|ckpt|pt|pth|onnx|bin|exe|dll|msi)$/i;
  const secrets = [
    /gh[pousr]_[A-Za-z0-9]{36,}/,
    /github_pat_[A-Za-z0-9_]{50,}/,
    /AKIA[0-9A-Z]{16}/,
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
    /(?:api[_-]?key|password|access[_-]?token)\s*[:=]\s*["'][^"'\s]{12,}["']/i
  ];
  for (const p of files) {
    const full = path.join(root, p);
    if (fs.lstatSync(full).isSymbolicLink()) { fail('Symlink prohibited in repository: ' + p); continue; }
    const fixture = p.startsWith('tests/fixtures/') && !['tests/fixtures/README.md', 'tests/fixtures/rights.json'].includes(p);
    if (forbiddenDir.test(p) || sensitive.test(p)) fail('Forbidden tracked data path: ' + p);
    if (fixture && !allowed.has(p.slice('tests/fixtures/'.length))) fail('Fixture is not rights-allowlisted: ' + p);
    const bytes = fs.readFileSync(full);
    if (!fixture && p !== 'tools/repository/validate.mjs') {
      for (const match of bytes.toString('utf8').matchAll(/SPDX-License-Identifier: ([A-Za-z0-9.+-]+)/g)) {
        if (match[1] !== 'AGPL-3.0-or-later') fail('Conflicting project SPDX notice: ' + p);
      }
    }
    if (!fixture && (dataExt.test(p) || bytes.includes(0) || bytes.length > 1024 * 1024))
      fail('Unapproved data/binary or oversized file: ' + p);
    // Scan fixture bytes too; copyright permission is not permission to commit secrets.
    if (secrets.some((pattern) => pattern.test(bytes.toString('utf8')))) fail('Possible secret in: ' + p);
  }

  // GitHub-like heading slugs and inline links. Reference-style links are
  // explicitly rejected until supported rather than silently left unchecked.
  const headings = (s) => {
    const counts = new Map();
    return new Set([...s.matchAll(/^#{1,6}\s+(.+?)\s*#*$/gm)].map((m) => {
      const base = m[1].toLowerCase().replace(/[^\p{L}\p{N}_\-\s]/gu, '').trim().replace(/\s/g, '-');
      const count = counts.get(base) || 0; counts.set(base, count + 1);
      return base + (count ? '-' + count : '');
    }));
  };
  for (const p of files.filter((p) => p.endsWith('.md'))) {
    const source = text(p).replace(/^```[\s\S]*?^```\s*$/gm, '');
    if (/^\s*\[[^\]]+\]:\s+\S+/m.test(source))
      fail('Use inline Markdown links so destinations are validated: ' + p);
    for (const match of source.matchAll(/!?\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
      const dest = match[1].replace(/^<|>$/g, '');
      if (/^(https?:|mailto:)/i.test(dest)) continue;
      if (/^[a-z][a-z0-9+.-]*:/i.test(dest)) { fail('Unsupported link scheme: ' + p); continue; }
      let target, fragment;
      try {
        const [file, hash] = dest.split('#');
        target = file ? path.posix.normalize(path.posix.join(path.posix.dirname(p), decodeURIComponent(file))) : p;
        fragment = hash ? decodeURIComponent(hash) : '';
      } catch { fail('Malformed internal link: ' + p); continue; }
      if (target.startsWith('../') || path.posix.isAbsolute(target) ||
        (!set.has(target) && ![...set].some((f) => f.startsWith(target.replace(/\/$/, '') + '/'))))
        fail('Broken internal link in ' + p + ': ' + dest);
      else if (fragment && target.endsWith('.md') && !headings(text(target)).has(fragment))
        fail('Broken heading link in ' + p + ': ' + dest);
    }
  }

  const yaml = new Map();
  for (const p of files.filter((p) => /\.ya?ml$/.test(p))) {
    const doc = parseDocument(text(p), { uniqueKeys: true });
    if (doc.errors.length || doc.warnings.length) { fail('Invalid or ambiguous YAML: ' + p); continue; }
    yaml.set(p, doc.toJS());
  }
  for (const p of ['.github/ISSUE_TEMPLATE/bug_report.yml', '.github/ISSUE_TEMPLATE/feature_request.yml']) {
    const form = yaml.get(p);
    if (!form?.name || !form.description || !Array.isArray(form.body) || !form.body.length) {
      fail('Invalid issue form: ' + p); continue;
    }
    const ids = new Set();
    for (const field of form.body) {
      if (!['markdown', 'input', 'textarea', 'dropdown', 'checkboxes'].includes(field.type))
        fail('Unknown issue form field: ' + p);
      if (field.type === 'markdown') {
        if (typeof field.attributes?.value !== 'string') fail('Missing form markdown: ' + p);
      } else {
        if (!/^[a-zA-Z0-9_-]+$/.test(field.id || '') || ids.has(field.id) || !field.attributes?.label)
          fail('Missing/duplicate form ID or label: ' + p);
        ids.add(field.id);
        if (field.validations?.required !== undefined && typeof field.validations.required !== 'boolean')
          fail('Invalid required flag: ' + p);
        if (['dropdown', 'checkboxes'].includes(field.type) && !Array.isArray(field.attributes?.options))
          fail('Missing form choices: ' + p);
      }
    }
  }
  if (yaml.get('.github/ISSUE_TEMPLATE/config.yml')?.blank_issues_enabled !== false)
    fail('Issue routing must retain structured forms');

  const updates = yaml.get('.github/dependabot.yml');
  if (updates?.version !== 2 || !Array.isArray(updates.updates) ||
    !updates.updates.some((u) => u['package-ecosystem'] === 'github-actions' && u.schedule?.interval === 'weekly'))
    fail('Weekly Actions Dependabot configuration missing');
  for (const u of updates?.updates || []) {
    if (u['package-ecosystem'] === 'npm' && !set.has(u.directory.replace(/^\//, '') + '/package.json'))
      fail('Dependabot npm entry has no real manifest');
    if (!['github-actions', 'npm'].includes(u['package-ecosystem']))
      fail('No application dependency ecosystem is approved');
  }

  for (const [p, workflow] of yaml) {
    if (!p.startsWith('.github/workflows/')) continue;
    if (!workflow || workflow.permissions?.contents !== 'read' ||
      Object.keys(workflow.permissions || {}).some((k) => k !== 'contents')) fail('Workflow permissions must default to contents read: ' + p);
    const events = typeof workflow.on === 'string' ? [workflow.on] :
      Array.isArray(workflow.on) ? workflow.on : Object.keys(workflow.on || {});
    if (!events.length || events.some((e) => !['push', 'pull_request', 'schedule', 'workflow_dispatch'].includes(e)))
      fail('Privileged/unapproved workflow trigger: ' + p);
    if (!workflow.concurrency?.group || workflow.concurrency['cancel-in-progress'] !== true)
      fail('Workflow concurrency missing: ' + p);
    for (const job of Object.values(workflow.jobs || {})) {
      if (job['runs-on'] !== 'ubuntu-latest' || !(job['timeout-minutes'] > 0 && job['timeout-minutes'] <= 30))
        fail('Hosted runner/timeout policy: ' + p);
      for (const [perm, access] of Object.entries(job.permissions || {})) {
        if (!(perm === 'contents' && access === 'read') &&
          !(p.endsWith('/codeql.yml') && perm === 'security-events' && access === 'write'))
          fail('Unapproved job permission: ' + p);
      }
      for (const step of job.steps || []) {
        if (step.uses && !/^[\w.-]+\/[\w./-]+@[a-f0-9]{40}$/.test(step.uses))
          fail('External Action must use a full commit SHA: ' + p);
        if (step.uses?.startsWith('actions/checkout@') && step.with?.['persist-credentials'] !== false)
          fail('Checkout must disable persisted credentials: ' + p);
        if (step.run && /\$\{\{/.test(step.run)) fail('Pass expressions through env, not shell interpolation: ' + p);
      }
    }
    if (text(p).includes('secrets.')) fail('Repository workflows must not consume secrets: ' + p);
  }
  const codeql = yaml.get('.github/workflows/codeql.yml');
  const init = codeql?.jobs?.analyze?.steps?.find((s) => s.uses?.startsWith('github/codeql-action/init@'));
  if (init?.with?.languages !== 'actions') fail('CodeQL must scan Actions only');
  return errors;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const files = trackedFiles(repositoryRoot);
    const errors = validate(repositoryRoot, files);
    for (const error of errors) console.error(error);
    if (errors.length) process.exitCode = 1;
    else console.log('Repository policies, license, links, YAML/forms, workflow policy and tracked-data checks passed (' + files.length + ' files). Not application tests.');
  } catch (error) {
    console.error('Repository validation failed: ' + error.message);
    process.exitCode = 1;
  }
}

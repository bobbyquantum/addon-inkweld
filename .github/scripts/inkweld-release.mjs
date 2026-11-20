// Helper for .github/workflows/inkweld-release.yml.
//
//   node inkweld-release.mjs plan <releases.json>
//     Reads `gh release list --json tagName,isDraft` output and the version
//     this app runs (inkweld/config.yaml), and writes to $GITHUB_OUTPUT:
//       newer=true|false
//       version=1.0.0-beta.9        (newest Inkweld release, no leading v)
//       tags=v1.0.0-beta.8 v1.0.0-beta.9   (every release this bump covers,
//                                           oldest first)
//
//   node inkweld-release.mjs apply <tag> [<tag>...]
//     Moves the app to the last tag given: Dockerfile FROM, config.yaml
//     version, the README status line and a new CHANGELOG entry that names
//     the earlier tags as skipped releases. Fails if any file didn't match.

import { appendFileSync, readFileSync, writeFileSync } from "node:fs";

const RELEASES = "https://github.com/bobbyquantum/inkweld/releases/tag";

function parse(version) {
  const m =
    /^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/.exec(
      version,
    );
  if (!m) return null;
  return {
    core: [Number(m[1]), Number(m[2]), Number(m[3])],
    pre: m[4] ? m[4].split(".") : [],
  };
}

// Semver precedence: 1.0.0-beta.9 < 1.0.0-beta.10 < 1.0.0.
function compare(a, b) {
  for (let i = 0; i < 3; i++) {
    if (a.core[i] !== b.core[i]) return a.core[i] - b.core[i];
  }
  if (!a.pre.length || !b.pre.length) return b.pre.length - a.pre.length;
  for (let i = 0; i < Math.min(a.pre.length, b.pre.length); i++) {
    const x = a.pre[i];
    const y = b.pre[i];
    if (x === y) continue;
    const xn = /^\d+$/.test(x);
    const yn = /^\d+$/.test(y);
    if (xn && yn) return Number(x) - Number(y);
    if (xn !== yn) return xn ? -1 : 1;
    return x < y ? -1 : 1;
  }
  return a.pre.length - b.pre.length;
}

const strip = (tag) => tag.replace(/^v/, "");

function currentVersion() {
  const config = readFileSync("inkweld/config.yaml", "utf8");
  const m = /^version:\s*"?([^"\s]+)"?\s*$/m.exec(config);
  if (!m) throw new Error("no version in inkweld/config.yaml");
  return m[1];
}

function output(values) {
  const lines = Object.entries(values).map(([k, v]) => `${k}=${v}`);
  console.log(lines.join("\n"));
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, lines.join("\n") + "\n");
  }
}

function plan(releasesFile) {
  const current = parse(currentVersion());
  const releases = JSON.parse(readFileSync(releasesFile, "utf8"))
    .filter((r) => !r.isDraft)
    .map((r) => ({ tag: r.tagName, v: parse(r.tagName) }))
    .filter((r) => r.v && compare(r.v, current) > 0)
    .sort((a, b) => compare(a.v, b.v));

  if (!releases.length) {
    output({ newer: "false", version: "", tags: "" });
    return;
  }
  output({
    newer: "true",
    version: strip(releases.at(-1).tag),
    tags: releases.map((r) => r.tag).join(" "),
  });
}

function replaceIn(file, pattern, replacement) {
  const before = readFileSync(file, "utf8");
  const after = before.replace(pattern, replacement);
  if (after === before) throw new Error(`${file}: nothing matched ${pattern}`);
  writeFileSync(file, after);
}

const link = (tag) => `[${strip(tag)}](${RELEASES}/${tag})`;

function list(items) {
  if (items.length < 2) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

function apply(tags) {
  if (!tags.length) throw new Error("apply needs at least one tag");
  const tag = tags.at(-1);
  const version = strip(tag);
  const skipped = tags.slice(0, -1);

  replaceIn(
    "inkweld/Dockerfile",
    /^FROM ghcr\.io\/bobbyquantum\/inkweld:\S+$/m,
    `FROM ghcr.io/bobbyquantum/inkweld:${version}`,
  );
  replaceIn("inkweld/config.yaml", /^version: .*$/m, `version: "${version}"`);
  replaceIn(
    "README.md",
    /following \[Inkweld [^\]]+\]\([^)]+\)/,
    `following [Inkweld ${version}](${RELEASES}/${tag})`,
  );

  let entry = `## ${version}\n\n- Runs [Inkweld ${version}](${RELEASES}/${tag})`;
  if (skipped.length) {
    const s = skipped.length > 1 ? "s" : "";
    entry += `,\n  and with it the change${s} from\n  ${list(skipped.map(link)).replaceAll(", ", ",\n  ").replaceAll(" and ", " and\n  ")},\n  which this app skipped.`;
  } else {
    entry += ".";
  }
  replaceIn("inkweld/CHANGELOG.md", /^# Changelog\n\n/, `# Changelog\n\n${entry}\n\n`);
}

const [command, ...args] = process.argv.slice(2);
if (command === "plan" && args.length === 1) plan(args[0]);
else if (command === "apply") apply(args);
else {
  console.error("usage: inkweld-release.mjs plan <releases.json> | apply <tag>...");
  process.exit(2);
}

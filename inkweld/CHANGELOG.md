# Changelog

## 1.0.0-beta.6

- Runs [Inkweld 1.0.0-beta.6](https://github.com/bobbyquantum/inkweld/releases/tag/v1.0.0-beta.6),
  and with it the security fixes from
  [1.0.0-beta.5](https://github.com/bobbyquantum/inkweld/releases/tag/v1.0.0-beta.5),
  which this app skipped. They fix several high-severity issues in sync,
  sign-in and accounts, so update soon.
- Project owners can share a live, read-only view of a project with a public
  link (Project Settings → Collaboration). Visitors outside Home Assistant can
  only open it through the direct port: the address the sidebar shows asks
  them to sign in to Home Assistant.
- The No AI / Allow AI choice is kept on your account, and dragging in the
  project tree no longer collapses folders.

## 1.0.0-beta.4

- Runs [Inkweld 1.0.0-beta.4](https://github.com/bobbyquantum/inkweld/releases/tag/v1.0.0-beta.4).
- Disabling or rejecting an account, resetting its password or recovering its
  passkey now disconnects any apps linked to it over MCP. Worth updating for
  if you use MCP clients on the direct port.
- Canvases have new text and effect options, and MCP clients can read and draw
  on them. PDF export works offline.
- Inkweld's new OpenID Connect sign-in isn't offered here: Home Assistant signs
  people in.

## 1.0.0-beta.3

- Runs [Inkweld 1.0.0-beta.3](https://github.com/bobbyquantum/inkweld/releases/tag/v1.0.0-beta.3).
- Fixes the Inkweld server silently dropping document edits. After updating,
  documents it lost come back when a device that still has them opens them or
  runs Sync All.

## 1.0.0-beta.1

- Runs [Inkweld 1.0.0-beta.1](https://github.com/bobbyquantum/inkweld/releases/tag/v1.0.0-beta.1),
  the first beta of Inkweld 1.0. The image is now pinned to that release
  instead of following Inkweld's development builds.
- The direct port is described for what it's for now: opening Inkweld outside
  the sidebar and MCP clients (Inkweld's desktop and Android apps are gone).

## 0.1.0-dev.2

- Removed config keys the app linter flags (boot, startup, watchdog);
  health checks come from the image's Docker HEALTHCHECK.

## 0.1.0-dev.1

- Prototype: Home Assistant ingress with automatic sign-in for HA users,
  admin list option, optional direct port.

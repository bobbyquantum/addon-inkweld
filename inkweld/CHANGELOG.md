# Changelog

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

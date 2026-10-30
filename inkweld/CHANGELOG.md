# Changelog

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

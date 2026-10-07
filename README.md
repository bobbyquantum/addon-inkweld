# Inkweld Home Assistant App

Runs [Inkweld](https://github.com/bobbyquantum/inkweld), a collaborative
writing and worldbuilding app, as a Home Assistant app with sidebar (ingress)
access.

**Status:** prototype. It will be published alongside the Inkweld v1 release.

## Installing for testing

This repository is private, so Home Assistant can't add it as an app
repository yet. Install it as a local app instead:

1. Copy the `inkweld/` folder to `/addons/inkweld` on the Home Assistant
   machine (with the Samba share or SSH app).
2. In Home Assistant, go to **Settings → Apps → App store**, open the ⋮ menu
   and choose **Check for updates**.
3. **Inkweld** appears under **Local apps**. Install and start it; the first
   install builds a thin layer over the published Inkweld image.

See [inkweld/DOCS.md](inkweld/DOCS.md) for configuration.

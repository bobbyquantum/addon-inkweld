# Inkweld Home Assistant App

Runs [Inkweld](https://github.com/bobbyquantum/inkweld), a collaborative
writing and worldbuilding app, as a Home Assistant app in your sidebar.
Home Assistant signs people in, and each Home Assistant user gets their own
Inkweld account.

**Status:** beta, following [Inkweld 1.0.0-beta.1](https://github.com/bobbyquantum/inkweld/releases/tag/v1.0.0-beta.1).

## Installing

[![Add this repository to your Home Assistant](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fbobbyquantum%2Faddon-inkweld)

Or add it by hand:

1. In Home Assistant, go to **Settings → Apps → App store**, open the ⋮ menu
   and choose **Repositories**.
2. Add `https://github.com/bobbyquantum/addon-inkweld`.
3. Find **Inkweld** in the store, install it and start it. The first install
   builds a thin layer over the published Inkweld image, so it takes a few
   minutes.
4. Open **Inkweld** from the sidebar.

See [inkweld/DOCS.md](inkweld/DOCS.md) for configuration, and the
[Inkweld docs](https://inkweld.org/docs/installation/home-assistant/) for how
Inkweld behaves behind Home Assistant.

Problems with the app go in this repository's issues; problems with Inkweld
itself in [Inkweld's issues](https://github.com/bobbyquantum/inkweld/issues).

## Testing changes locally

Copy the `inkweld/` folder to `/addons/inkweld` on the Home Assistant machine
(with the Samba share or SSH app), then **Check for updates** in the app store
menu. The copy appears under **Local apps**.

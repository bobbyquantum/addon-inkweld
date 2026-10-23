# Inkweld

[Inkweld](https://github.com/bobbyquantum/inkweld) is a collaborative writing
and worldbuilding app. This app runs an Inkweld server on your Home Assistant
machine and puts it in the sidebar.

## Signing in

Open **Inkweld** from the sidebar. Home Assistant has already signed you in, so
Inkweld creates an account for you on your first visit, named after your Home
Assistant username. Each Home Assistant user gets their own Inkweld account.

## Administrators

List the Home Assistant usernames that should administer Inkweld under
**Inkweld admins**. The list is applied every time someone opens Inkweld, so
removing a name takes their admin rights away on their next visit. The last
remaining administrator always keeps them.

With the list empty, the first person to open Inkweld becomes its
administrator.

## Outside the sidebar, and MCP clients

Inside the sidebar Inkweld can't be installed as an app, and MCP clients
can't sign in through Home Assistant. To open Inkweld directly (for example
to install it as an app on your phone or computer) or to connect an MCP
client, set a host port for `8333/tcp` in the app's **Network** settings,
then:

- add the addresses you open Home Assistant and the direct port on (for
  example `http://homeassistant.local:8123` and
  `http://homeassistant.local:8333`) to **Allowed origins for the direct
  port**; passkeys check them too;
- set **Passkey domain** to that hostname before anyone registers a passkey;
- open Inkweld in the sidebar, then add a passkey (or password) to your
  account in Settings so you can sign in on the direct port.

Anyone who can reach that port can see the sign-in page, so only expose it on
networks you trust.

## Backups

Backups stop Inkweld while they run (a "cold" backup), because its databases
can't be copied safely while they're being written.

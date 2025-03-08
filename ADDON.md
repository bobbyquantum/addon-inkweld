# Inkweld for Home Assistant

This add-on provides Inkweld, a collaborative document editing platform with real-time collaboration features, for your Home Assistant instance.

## Features

- Real-time collaborative editing
- Version history tracking
- Document organization with folders
- User authentication and permissions
- Image and attachment support
- Fully integrated with Home Assistant

## Installation

1. Add the repository to your Home Assistant instance.
2. Install the "Inkweld" add-on.
3. Start the add-on.
4. Click "OPEN WEB UI" to open the Inkweld interface.

## Configuration

### Option: `db_type`

- Type: `string`
- Default: `sqlite`
- Description: Database type to use for storing Inkweld data.

### Option: `db_path`

- Type: `string`
- Default: `/data/sqlite.db`
- Description: Path to the SQLite database file.

### Option: `db_logging`

- Type: `boolean`
- Default: `false`
- Description: Enable database query logging.

### Option: `port`

- Type: `number`
- Default: `8333`
- Description: Port that Inkweld will run on.

### Option: `host`

- Type: `string`
- Default: `0.0.0.0`
- Description: Host that Inkweld will listen on.

### Option: `local_users_enabled`

- Type: `boolean`
- Default: `true`
- Description: Enable local user authentication.

### Option: `github_enabled`

- Type: `boolean`
- Default: `false`
- Description: Enable GitHub OAuth authentication.

### Option: `github_client_id`

- Type: `string`
- Default: ``
- Description: GitHub OAuth Client ID (required if GitHub authentication is enabled).

### Option: `github_client_secret`

- Type: `string`
- Default: ``
- Description: GitHub OAuth Client Secret (required if GitHub authentication is enabled).

### Option: `data_path`

- Type: `string`
- Default: `/data/yjs`
- Description: Path to store Yjs document data.

## Support

If you have any issues or questions, please file an issue on the GitHub repository.

# Inkweld Ingress Implementation

## Overview

This addon supports Home Assistant's Ingress feature, allowing users to access the Inkweld interface directly through the Home Assistant UI without additional port forwarding or authentication.

## Implementation Details

The Ingress implementation uses the following architecture:

- **Main Application**: Runs on port 8333 and is exposed for direct access
- **Ingress Proxy**: Nginx running on port 8099, restricted to only accept connections from the Home Assistant proxy (172.30.32.2)

## Configuration

Ingress is configured in the `config.yaml` file:

```yaml
ingress: true
ingress_port: 8099
```

## Technical Architecture

1. **Nginx Proxy**:
   - Listens on port 8099
   - Only accepts connections from Home Assistant's proxy (172.30.32.2)
   - Forwards requests to the main application on 127.0.0.1:8333
   - Preserves WebSocket connections
   - Passes the `X-Ingress-Path` header from Home Assistant

2. **S6 Supervision**:
   - `nginx` service managed by S6 supervisor
   - Automatic startup alongside the main application

## Security Considerations

- Only the Home Assistant proxy (172.30.32.2) can access the ingress port
- Authentication is handled entirely by Home Assistant
- The main application port (8333) remains available for direct access with its own authentication

## Initialization

The initialization script (`00-inkweld-init`) sets up the necessary environment for both the main application and the ingress proxy.
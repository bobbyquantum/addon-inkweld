# Single-stage build image that includes the entire inkweld folder
FROM ghcr.io/home-assistant/amd64-base-debian:bookworm

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Update package lists and install dependencies for both building and running
RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  nodejs \
  npm \
  curl \
  bash \
  git \
  python3 \
  make \
  nginx \
  sqlite3 \
  g++ \
  ca-certificates \
  unzip && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

WORKDIR /app

COPY inkweld /app/inkweld

WORKDIR /app/inkweld/frontend
RUN bun install && \
  npm run build

# Create structure expected by run scripts
WORKDIR /app
RUN ln -s /app/inkweld/server /app/server && \
  ln -s /app/inkweld/frontend /app/frontend && \
  mkdir -p /data /var/lib/yjs

# Install production dependencies for server
WORKDIR /app/server
RUN bun install && \
  bun run build

WORKDIR /app

# Copy rootfs for Home Assistant integration
COPY rootfs /

# Ensure S6 scripts and service files are executable 
RUN chmod a+x \
  /etc/services.d/inkweld/run \
  /etc/services.d/inkweld/finish \
  /etc/services.d/nginx/run \
  /etc/services.d/nginx/finish \
  /etc/cont-init.d/00-inkweld-init 

# Expose ports for both main app and ingress
EXPOSE 8333 8099

# Entrypoint is inherited from the Home Assistant base image

# Thin layer over the published Inkweld image: adds jq for reading the app
# options and an entrypoint that maps them to Inkweld's environment.
#
# Pinned to an Inkweld release (amd64 + arm64). Home Assistant only rebuilds
# the app when `version` in config.yaml changes, so bump both together. To
# test an unreleased Inkweld build, point FROM at `dev` (the latest build of
# Inkweld's main branch) or at an image built from a branch.
FROM ghcr.io/bobbyquantum/inkweld:1.0.0-beta.3

USER root
RUN apt-get update \
  && apt-get install -y --no-install-recommends jq \
  && rm -rf /var/lib/apt/lists/*

# Health checks use the base image's HEALTHCHECK (GET /api/v1/health).

COPY run.sh /run.sh
RUN chmod 755 /run.sh

CMD ["/run.sh"]

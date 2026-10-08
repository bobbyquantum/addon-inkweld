# Thin layer over the published Inkweld image: adds jq for reading the app
# options and an entrypoint that maps them to Inkweld's environment.
#
# Prototype: `dev` is the latest build of Inkweld's main branch (amd64 +
# arm64). Pin a release tag for v1. To test an unmerged Inkweld branch, push
# an image built from it and point FROM at that tag.
FROM ghcr.io/bobbyquantum/inkweld:dev

USER root
RUN apt-get update \
  && apt-get install -y --no-install-recommends jq \
  && rm -rf /var/lib/apt/lists/*

# Health checks use the base image's HEALTHCHECK (GET /api/v1/health).

COPY run.sh /run.sh
RUN chmod 755 /run.sh

CMD ["/run.sh"]

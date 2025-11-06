# ---------- base with system libs for GeoPandas/Shapely/PROJ/GDAL ----------
FROM python:3.11-slim AS base
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    POETRY_VERSION=1.8.3 \
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_CREATE=false

# Geo stack (for fiona/rasterio/pyproj where needed)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gdal-bin libgdal-dev libgeos-dev proj-bin proj-data libproj-dev \
    build-essential curl ca-certificates git \
 && rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN pip install "poetry==${POETRY_VERSION}"

WORKDIR /app

# Only copy poetry metadata first for layer caching
COPY pyproject.toml poetry.lock* /app/

# ---------- development image ----------
FROM base AS dev
# Install all deps incl. dev
RUN poetry install --no-root --with dev
# Now bring in the source
COPY . /app
EXPOSE 8001
# Hot reload
CMD ["poetry","run","uvicorn","py_analytics.main:app","--host","0.0.0.0","--port","8001","--reload"]

# ---------- production build (deps only) ----------
FROM base AS prod-deps
# Install only main deps (no dev)
RUN poetry install --no-root --only main

# ---------- production runtime ----------
FROM python:3.11-slim AS prod
# (small runtime; add shared libs again for GDAL/PROJ at runtime)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gdal-bin libgdal-dev libgeos-dev proj-bin proj-data libproj-dev \
 && rm -rf /var/lib/apt/lists/*
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PIP_NO_CACHE_DIR=1
WORKDIR /app
COPY --from=prod-deps /usr/local /usr/local
COPY . /app
EXPOSE 8001
CMD ["uvicorn","py_analytics.main:app","--host","0.0.0.0","--port","8001"]

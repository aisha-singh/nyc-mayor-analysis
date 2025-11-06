from fastapi import FastAPI
from .routers import geo

app = FastAPI(title="Newsroom Analytics API")

@app.get("/healthz")
def healthz():
    return {"ok": True}

app.include_router(geo.router)
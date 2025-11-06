from fastapi import APIRouter

router = APIRouter(prefix="/geo", tags=["geo"])

@router.get("/sample")
def sample():
    return {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "properties": {"name": "Example"},
            "geometry": {"type": "Point", "coordinates": [-122.33, 47.61]}
        }]
    }

'use client';

import {useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import {MapboxOverlay} from '@deck.gl/mapbox';
import {makeDeckLayers} from '@/lib/map/deckLayers';
import {registerPmtilesProtocol} from '@/lib/map/pmtiles';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

export default function MapView() {
  const containerRef = useRef<HTMLDivElement|null>(null);
  const mapRef = useRef<mapboxgl.Map|null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    registerPmtilesProtocol();

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11', // OSM-derived Mapbox style
      center: [-122.33, 47.61],
      zoom: 9,
      attributionControl: false
    });

    map.addControl(new mapboxgl.NavigationControl({visualizePitch: true}));
    map.addControl(new mapboxgl.AttributionControl({
      compact: true,
      customAttribution: '© OpenStreetMap contributors'
    }));

    const overlay = new MapboxOverlay({interleaved: true, layers: makeDeckLayers()});
    map.addControl(overlay);

    mapRef.current = map;
    return () => { overlay.remove(); map.remove(); mapRef.current = null; };
  }, []);

  return <div ref={containerRef} className="h-full w-full" />;
}

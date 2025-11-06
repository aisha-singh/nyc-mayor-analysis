import type {Layer} from '@deck.gl/core';
import {GeoJsonLayer} from '@deck.gl/layers';

export function makeDeckLayers(): Layer[] {
  const demo: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { name: 'Newsroom Marker' },
        geometry: { type: 'Point', coordinates: [-122.33, 47.61] }
      }
    ]
  };

  return [
    new GeoJsonLayer({
      id: 'demo-geojson',
      data: demo,
      pickable: true,
      pointType: 'circle',
      getFillColor: [20, 90, 160, 180],
      getPointRadius: 6
    })
  ];
}

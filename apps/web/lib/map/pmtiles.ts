import mapboxgl from 'mapbox-gl';
import {Protocol} from 'pmtiles';

export function registerPmtilesProtocol() {
  // avoid double registration during hot reload
  // @ts-ignore
  if (mapboxgl.addProtocol && !(globalThis as any).__pmtiles) {
    const protocol = new Protocol();
    // @ts-ignore
    mapboxgl.addProtocol('pmtiles', protocol.tile);
    (globalThis as any).__pmtiles = true;
  }
}

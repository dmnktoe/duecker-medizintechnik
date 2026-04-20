import type { COBEOptions } from 'cobe';

/** Melsungen / Schwalmstadt — HQ region */
const HQ: [number, number] = [51.1304, 9.5434];

const DUBAI: [number, number] = [25.2048, 55.2708];
const SINGAPORE: [number, number] = [1.3521, 103.8198];
const NYC: [number, number] = [40.7128, -74.006];
const SAO_PAULO: [number, number] = [-23.5505, -46.6333];

/**
 * COBE v2: arcs + marker ids (CSS anchor vars on canvas wrapper).
 * Tuned for the home bento “Vertrieb” tile — flight-route style like cobe docs.
 */
export const DISTRIBUTION_GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  phi: 0,
  theta: 0.32,
  mapSamples: 48000,
  mapBrightness: 3.5,
  mapBaseBrightness: 0.02,
  dark: 0.86,
  diffuse: 3.9,
  baseColor: [0.1, 0.48, 0.74],
  markerColor: [0.76, 0.9, 1],
  glowColor: [0.12, 0.55, 0.84],
  scale: 1.12,
  devicePixelRatio: 2,
  markerElevation: 0.02,
  arcColor: [0.42, 0.68, 0.98],
  arcWidth: 0.52,
  arcHeight: 0.3,
  markers: [
    { location: HQ, size: 0.036, id: 'melsungen', color: [1, 1, 1] },
    { location: DUBAI, size: 0.019, id: 'ae' },
    { location: SINGAPORE, size: 0.019, id: 'sg' },
    { location: NYC, size: 0.021, id: 'us' },
    { location: SAO_PAULO, size: 0.02, id: 'br' },
  ],
  arcs: [
    { from: HQ, to: DUBAI, id: 'arc-de-ae' },
    { from: HQ, to: SINGAPORE, id: 'arc-de-sg' },
    { from: HQ, to: NYC, id: 'arc-de-us' },
    { from: HQ, to: SAO_PAULO, id: 'arc-de-br' },
  ],
};

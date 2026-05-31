import features from '@/config/features.json';

export type FeatureName = keyof typeof features;

/** Reads a feature flag from the committed config. Works in both server and
 *  client components because the values are static, bundled at build time. */
export function isFeatureEnabled(name: FeatureName): boolean {
  return features[name] === true;
}

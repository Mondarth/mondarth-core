import Logger from '@src/utils/logger';

const FEATURES: Record<string, boolean> = {};

export function registerFeature(featureId: string, initialState: boolean = false): void {
  if (featureId in FEATURES) {
    Logger.debug(`Feature ${featureId} already registered. (registerFeature ignored)`);
    return;
  }
  FEATURES[featureId] = initialState;
}

export function setFeature(featureId: string, state: boolean): void {
  if (!(featureId in FEATURES)) {
    Logger.warn(`Feature ${featureId} is not recognised. (setFeature ignored)`);
    return;
  }

  if (FEATURES[featureId] === state) {
    Logger.info(`Feature ${featureId} is already set to ${state}.`);
  }

  FEATURES[featureId] = state;
  Logger.debug(`Feature ${featureId} set to ${state}`);
}

export function hasFeature(featureId: string): boolean {
  if (!(featureId in FEATURES)) {
    Logger.debug(`Feature ${featureId} is not recognised. (hasFeature always false)`);
  }
  return FEATURES[featureId] ?? false;
}

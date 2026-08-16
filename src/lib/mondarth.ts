import HookManager from '@src/hooks/hookManager';
import { hasFeature } from '@src/features/featureManager';
import Logger from '@src/utils/logger';
import Settings from '@src/settings';

export interface MondarthAPI {
  INITIALIZED: boolean;
  Settings: typeof Settings;
  Logger: typeof Logger;
  HookManager: typeof HookManager;
  hasFeature(fiatureId: string): boolean;
  initialize(): void;
}

const API: MondarthAPI = {
  INITIALIZED: false,

  Settings, // All Mondarth settings accessed through common API

  Logger, // Common logging functions

  HookManager, // All Mondarth modules register/unregister hooks through here

  hasFeature, // Simple feature guard

  // Surfaced to allow the API to be reinitialised during dev
  initialize() {
    if (API.INITIALIZED) return;

    API.INITIALIZED = true;
  },
};

export default API;

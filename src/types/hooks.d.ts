import '@league-of-foundry-developers/foundry-vtt-types';

export {};

// Copied from https://github.com/League-of-Foundry-Developers/foundry-vtt-types/blob/7df23725e09de6eb86788bd405a97cb955432a46/tests/custom/custom-hooks.d.ts
declare module 'fvtt-types/configuration' {
  namespace Hooks {
    interface HookConfig {
      'mondarth-core:test': () => void;
      'mondarth-core:Ready': () => void;
    }
  }
}

import { MODULE_ID } from '@lib/constants';
import Mondarth from '@lib/mondarth';

Mondarth.HookManager.registerHook('local', 'mondarth-core:test', () => {});

Hooks.once('init', async () => {
  Mondarth.initialize();

  // Setup public API
  globalThis.Mondarth = Mondarth;
  game.modules!.get(MODULE_ID)!.api = Mondarth;

  // Announce
  Mondarth.Logger.log('Mondarth (CORE) loaded');
  Hooks.callAll('mondarth-core:Ready');
});

Hooks.once('ready', () => {
  if (!game.modules!.get('lib-wrapper')?.active && game.user?.isGM)
    ui.notifications?.error("Module XYZ requires the 'libWrapper' module. Please install and activate it.");

  libWrapper.register('mondarth-core', 'TokenDocument.prototype.getUserLevel', function (wrapped, ...args) {
    Mondarth.Logger.debug('TokenDocument.prototype.getUserLevel was called');
    let result = wrapped(...args);

    if (!game.user.isGM && this.getFlag('mondarth-core', 'isGhost')) {
      Mondarth.Logger.debug('Token is a ghost');
      result = CONST.DOCUMENT_META_OWNERSHIP_LEVELS.NONE;
    }

    return result;
  });
});

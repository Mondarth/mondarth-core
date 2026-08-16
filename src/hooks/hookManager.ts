import Mondarth from '@lib/mondarth';
import Logger from '@src/utils/logger';

const HOOKS: Record<string, Record<Hooks.HookName, number>> = {};

export default {
  registerHook(group: string, name: Hooks.HookName, fn: Hooks.Function<Hooks.HookName>, { once = false } = {}): void {
    if (!(group in HOOKS)) HOOKS[group] = {} as Record<Hooks.HookName, number>;
    if (name in HOOKS[group]) {
      Mondarth.Logger.debug(`Attempt to Register Hook (ignored) ${group}, ${name}, ${fn}, ${once}`);
      return;
    }
    Logger.debug(`Registering Hook ${group}, ${name}, ${fn}, ${once}`);
    const hookID: number = Hooks.on(name, fn, { once });
    HOOKS[group][name] = hookID;
  },

  unregisterHook(group: string, name: Hooks.HookName): void {
    if (group in HOOKS && name in HOOKS[group]) {
      Logger.debug(`Un-Registering Hook ${group}, ${name}, id: ${HOOKS[group][name]}`);
      Hooks.off(name, HOOKS[group][name]);
      delete HOOKS[group][name];
    } else {
      Mondarth.Logger.debug('Attempt to Un-Regester unknown Hook');
    }
  },
};

import Settings from '@src/settings';

export default {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  log(...args: any[]) {
    console.log('Mondarth | ', ...args);
  },

  info(...args: any[]) {
    console.info('Mondarth | ', ...args);
  },

  warn(...args: any[]) {
    console.warn('Mondarth | ', ...args);
  },

  error(...args: any[]) {
    console.error('Mondarth | ', ...args);
  },

  debug(...args: any[]) {
    if (!Settings.debug) return;
    console.info('Mondarth | ', ...args);
  },
};

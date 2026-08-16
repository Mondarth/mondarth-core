import '@league-of-foundry-developers/foundry-vtt-types';
import MondarthClass from '@lib/mondarth';

declare global {
  interface Module {
    api: typeof MondarthClass;
  }

  var Mondarth: object; //eslint-disable-line no-var
}

export {};

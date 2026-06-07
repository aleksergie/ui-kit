import { InjectionToken, signal, WritableSignal } from '@angular/core';

import { TreeController } from './tree.interfaces';

const isExpanded: WritableSignal<boolean> = signal(true);

export const DEFAULT_TREE_CONTROLLER: TreeController<unknown> = {
  expanded: () => isExpanded,
  toggle: () => undefined,
};

export const TREE_CONTROLLER = new InjectionToken<TreeController<unknown>>(
  'TREE_CONTROLLER',
  {
    factory: () => DEFAULT_TREE_CONTROLLER,
  },
);

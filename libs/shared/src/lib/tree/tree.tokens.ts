import { InjectionToken } from '@angular/core';

import { TreeAccessor, TreeController } from './tree.interfaces';

export const DEFAULT_TREE_CONTROLLER: TreeController<unknown> = {
  isExpanded: () => true,
  toggle: () => undefined,
};

export const TREE_CONTROLLER = new InjectionToken<TreeController<unknown>>(
  'TREE_CONTROLLER',
  {
    factory: () => DEFAULT_TREE_CONTROLLER,
  },
);

export const TREE_ACCESSOR = new InjectionToken<TreeAccessor<unknown, unknown>>(
  'TREE_ACCESSOR',
);

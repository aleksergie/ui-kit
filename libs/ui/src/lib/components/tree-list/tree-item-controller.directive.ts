import { Directive, forwardRef, input } from '@angular/core';
import { TREE_CONTROLLER, TreeController } from '@ui-kit/shared';

import { TreeItem } from './tree-item';

@Directive({
  selector: '[libTreeController]:not([expandedMap])',
  providers: [
    {
      provide: TREE_CONTROLLER,
      useExisting: forwardRef(() => TreeItemControllerDirective),
    },
  ],
  exportAs: 'libTreeController',
})
export class TreeItemControllerDirective<T = unknown>
  implements TreeController<TreeItem<T>>
{
  private readonly expanded = new WeakMap<TreeItem<T>, boolean>();

  public readonly fallback = input(true, { alias: 'libTreeController' });

  public isExpanded(item: TreeItem<T>): boolean {
    return this.expanded.get(item) ?? this.fallback();
  }

  public toggle(item: TreeItem<T>): void {
    this.expanded.set(item, !this.isExpanded(item));
  }
}

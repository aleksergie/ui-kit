import { Directive, forwardRef, input, output } from '@angular/core';
import { TREE_ACCESSOR, TREE_CONTROLLER, TreeAccessor, TreeController } from '@ui-kit/shared';

import { TreeItem } from './tree-item';

@Directive({
  selector: '[libTreeController][expandedMap]',
  providers: [
    {
      provide: TREE_ACCESSOR,
      useExisting: forwardRef(() => TreeControllerDirective),
    },
    {
      provide: TREE_CONTROLLER,
      useExisting: forwardRef(() => TreeControllerDirective),
    },
  ],
  exportAs: 'libTreeController',
})
export class TreeControllerDirective<T = unknown>
  implements TreeController<TreeItem<T>>, TreeAccessor<TreeItem<T>, T>
{
  private readonly items = new Map<TreeItem<T>, T>();

  public readonly fallback = input(true, { alias: 'libTreeController' });
  public readonly expandedMap = input(new Map<T, boolean>());
  public readonly toggled = output<T>();

  public register(item: TreeItem<T>, value: T): void {
    this.items.set(item, value);
  }

  public unregister(item: TreeItem<T>): void {
    this.items.delete(item);
  }

  public isExpanded(item: TreeItem<T>): boolean {
    if (!this.items.has(item)) {
      return this.fallback();
    }

    const value = this.items.get(item) as T;

    return this.expandedMap().get(value) ?? this.fallback();
  }

  public toggle(item: TreeItem<T>): void {
    if (!this.items.has(item)) {
      return;
    }

    const value = this.items.get(item) as T;
    const expanded = !this.isExpanded(item);

    this.expandedMap().set(value, expanded);
    this.toggled.emit(value);
  }
}

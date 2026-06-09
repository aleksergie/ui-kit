import { Directive, Signal, WritableSignal, forwardRef, input, signal } from '@angular/core';
import { TREE_CONTROLLER, TreeController } from '@ui-kit/shared';

import { TreeItem } from './tree-item';

@Directive({
  selector: '[uikTreeController]',
  providers: [
    {
      provide: TREE_CONTROLLER,
      useExisting: forwardRef(() => TreeItemControllerDirective),
    },
  ],
  exportAs: 'uikTreeController',
})
export class TreeItemControllerDirective<T = unknown>
  implements TreeController<TreeItem<T>> {
  private readonly states = new WeakMap<TreeItem<T>, WritableSignal<boolean>>();

  public readonly fallback = input(true, { alias: 'uikTreeController' });

  public expanded(item: TreeItem<T>): Signal<boolean> {
    return this.getStateForItem(item);
  }

  public toggle(item: TreeItem<T>): void {
    this.getStateForItem(item).update((expanded) => !expanded);
  }

  private getStateForItem(item: TreeItem<T>): WritableSignal<boolean> {
    let state = this.states.get(item);

    if (!state) {
      state = signal(this.fallback());
      this.states.set(item, state);
    }

    return state;
  }
}

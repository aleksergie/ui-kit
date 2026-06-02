import { Directive, OnChanges, OnDestroy, inject, input } from '@angular/core';
import { TREE_ACCESSOR, TreeAccessor } from '@ui-kit/shared';

import { TreeItem } from './tree-item';

@Directive({
  selector: 'lib-tree-item[libTreeNode]',
})
export class TreeNode<T = unknown> implements OnChanges, OnDestroy {
  private readonly item = inject(TreeItem) as TreeItem<T>;
  private readonly accessor = inject(TREE_ACCESSOR, {
    optional: true,
  }) as TreeAccessor<TreeItem<T>, T> | null;

  public readonly value = input.required<T>({ alias: 'libTreeNode' });

  public ngOnChanges(): void {
    this.accessor?.register(this.item, this.value());
  }

  public ngOnDestroy(): void {
    this.accessor?.unregister(this.item);
  }
}

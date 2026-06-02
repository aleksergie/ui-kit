import { ChangeDetectionStrategy, Component, TemplateRef, TrackByFunction, forwardRef, input } from '@angular/core';
import {
  TreeChildrenAccessor,
  TreeNodeContext,
  defaultTreeChildrenAccessor,
} from '@ui-kit/shared';

import { TreeItem } from './tree-item';
import { TreeNode } from './tree-node.directive';

@Component({
  selector: 'lib-tree-list',
  imports: [TreeItem, TreeNode, forwardRef(() => TreeList)],
  templateUrl: './tree-list.html',
  styleUrl: './tree-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'tree',
  },
})
export class TreeList<T = unknown> {
  public readonly nodes = input<readonly T[]>([]);
  public readonly nodeTemplate =
    input.required<TemplateRef<TreeNodeContext<T, TreeItem<T>>>>();
  public readonly childrenAccessor = input<TreeChildrenAccessor<T>>(
    defaultTreeChildrenAccessor,
  );
  public readonly level = input(0);
  public readonly trackBy = input<TrackByFunction<T>>((_, item) => item);

  protected childrenOf(node: T): readonly T[] {
    return this.childrenAccessor()(node);
  }

  protected hasChildren(node: T): boolean {
    return this.childrenOf(node).length > 0;
  }
}

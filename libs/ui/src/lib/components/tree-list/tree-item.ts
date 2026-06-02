import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  inject,
  input,
} from '@angular/core';
import { TREE_CONTROLLER, TreeController, TreeNodeContext } from '@ui-kit/shared';

@Component({
  selector: 'lib-tree-item',
  imports: [NgTemplateOutlet],
  templateUrl: './tree-item.html',
  styleUrl: './tree-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'treeitem',
    '[class._expandable]': 'hasChildren',
    '[attr.aria-expanded]': 'hasChildren ? isExpanded : null',
  },
})
export class TreeItem<T = unknown> {
  private readonly controller = inject(TREE_CONTROLLER) as TreeController<TreeItem<T>>;

  public readonly node = input.required<T>();
  public readonly nodeTemplate =
    input.required<TemplateRef<TreeNodeContext<T, TreeItem<T>>>>();
  public readonly level = input(0);
  public readonly children = input<readonly T[]>([]);

  public readonly toggle = (): void => {
    this.controller.toggle(this);
  };

  public get hasChildren(): boolean {
    return this.children().length > 0;
  }

  public get isExpanded(): boolean {
    return this.controller.isExpanded(this);
  }

  protected get context(): TreeNodeContext<T, TreeItem<T>> {
    return {
      $implicit: this.node(),
      item: this,
      level: this.level(),
      children: this.children(),
      hasChildren: this.hasChildren,
      expanded: this.isExpanded,
      toggle: this.toggle,
    };
  }
}

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  computed,
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
    '[class._expandable]': 'hasChildren()',
    '[attr.aria-expanded]': 'hasChildren() ? isExpanded() : null',
  },
})
export class TreeItem<T = unknown> {
  private readonly controller = inject(TREE_CONTROLLER) as TreeController<TreeItem<T>>;

  public readonly node = input.required<T>();
  public readonly nodeTemplate =
    input.required<TemplateRef<TreeNodeContext<T, TreeItem<T>>>>();
  public readonly level = input(0);
  public readonly children = input<readonly T[]>([]);

  public readonly isExpanded = this.controller.expanded(this);

  public readonly toggle = (): void => {
    this.controller.toggle(this);
  };

  public readonly hasChildren = computed(() => this.children().length > 0);

  protected readonly context = computed<TreeNodeContext<T, TreeItem<T>>>(() => ({
    $implicit: this.node(),
    item: this,
    level: this.level(),
    children: this.children(),
    hasChildren: this.children().length > 0,
    expanded: this.isExpanded(),
    toggle: this.toggle,
  }));
}

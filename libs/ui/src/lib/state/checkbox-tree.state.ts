import { signal } from '@angular/core';
import { CheckboxNode } from '@ui-kit/shared';

type CheckboxValue = boolean | null;

export interface CheckboxTreeNode {
  readonly id: number;
  readonly checked: CheckboxValue;
  readonly children?: readonly CheckboxTreeNode[];
}

export class CheckboxTreeState<T extends CheckboxTreeNode = CheckboxNode> {
  private readonly selection = signal(new Map<number, boolean>());
  private leafCache = new WeakMap<CheckboxTreeNode, readonly T[]>();

  public constructor(nodes: readonly T[]) {
    this.reset(nodes);
  }

  public reset(nodes: readonly T[]): void {
    this.leafCache = new WeakMap();

    const next = new Map<number, boolean>();

    for (const node of nodes) {
      for (const leaf of this.leavesOf(node)) {
        next.set(leaf.id, leaf.checked === true);
      }
    }

    this.selection.set(next);
  }

  public getState(node: T): CheckboxValue {
    const leaves = this.leavesOf(node);
    const [first] = leaves;

    if (!first) {
      return false;
    }

    const selected = this.selection();
    const value = selected.get(first.id) ?? false;

    return leaves.every((leaf) => (selected.get(leaf.id) ?? false) === value)
      ? value
      : null;
  }

  public toggle(node: T, value: boolean): void {
    const next = new Map(this.selection());

    for (const leaf of this.leavesOf(node)) {
      next.set(leaf.id, value);
    }

    this.selection.set(next);
  }

  private leavesOf(node: T): readonly T[] {
    const cached = this.leafCache.get(node);
    if (cached) return cached;

    const result = node.children?.length
      ? node.children.flatMap((child) => this.leavesOf(child as T))
      : [node];

    this.leafCache.set(node, result);
    return result;
  }
}

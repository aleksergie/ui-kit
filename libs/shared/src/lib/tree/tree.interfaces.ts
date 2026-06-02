export type TreeChildrenAccessor<T> = (node: T) => readonly T[];

export interface TreeController<TItem> {
  isExpanded(item: TItem): boolean;
  toggle(item: TItem): void;
}

export interface TreeNodeContext<T, TItem> {
  readonly $implicit: T;
  readonly item: TItem;
  readonly level: number;
  readonly children: readonly T[];
  readonly hasChildren: boolean;
  readonly expanded: boolean;
  readonly toggle: () => void;
}

export function defaultTreeChildrenAccessor<T>(node: T): readonly T[] {
  const children = (node as { children?: readonly T[] }).children;

  return Array.isArray(children) ? children : [];
}

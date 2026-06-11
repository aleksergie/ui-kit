export interface CheckboxNode {
  readonly id: number;
  readonly name: string;
  readonly checked: boolean | null;
  readonly children?: readonly CheckboxNode[];
}

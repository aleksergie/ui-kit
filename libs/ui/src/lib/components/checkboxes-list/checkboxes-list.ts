import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Checkbox, ICheckbox } from "@ui-kit/shared"
import { uiMapperPipe } from "../../pipes/mapper/mapper.pipe";


function flatten(item: ICheckbox): readonly ICheckbox[] {
  return item.children
    ? item.children.map(flatten).reduce((arr, item) => [...arr, ...item], [])
    : [item];
}

@Component({
  selector: 'lib-checkboxes-list',
  imports: [CommonModule, ReactiveFormsModule, Checkbox, FormsModule, uiMapperPipe],
  templateUrl: './checkboxes-list.html',
  styleUrl: './checkboxes-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxesList {
  @Input() public checkboxesData: ICheckbox[] = [];
  protected map: Map<ICheckbox, any> = new Map<ICheckbox, any>()


  public ngDoCheck(): void {
    console.log('ngDoCheck', this.checkboxesData);

  }

  protected readonly getValue = (
    item: ICheckbox,
    map: Map<ICheckbox, boolean>,
  ): boolean | null => {
    let result: boolean | null = null;

    flatten(item).forEach((item) => this.map?.set(item, item.checked));

    const flat = flatten(item);
    const key = flat[0]!;

    if (key) {
      result = !!map.get(key);
    }

    for (const item of flat) {
      if (result !== !!map.get(item)) {
        return null;
      }
    }

    return result;
  };

  protected onChecked(node: ICheckbox, value: boolean): void {
    flatten(node).forEach((item) => this.map.set(item, value));

    console.log('map onChecked', new Map(this.map.entries()));
    this.map = new Map(this.map.entries());
  }
}

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICheckbox } from '@ui-kit/shared';

import { Checkbox } from '../../directives/checkbox.directive';
import { TreeItemControllerDirective } from '../tree-list/tree-item-controller.directive';
import { TreeList } from '../tree-list/tree-list';
import { CheckboxTreeState } from './checkbox-tree.state';

@Component({
  selector: 'uik-nested-checkboxes',
  imports: [FormsModule, Checkbox, TreeItemControllerDirective, TreeList],
  templateUrl: './nested-checkboxes.html',
  styleUrl: './nested-checkboxes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedCheckboxes {
  protected readonly checkboxesData = signal<ICheckbox[]>([
    {
      id: 1,
      name: 'Electronics',
      checked: false,
      children: [
        {
          id: 2,
          name: 'Mobile phones',
          checked: null,
          children: [
            {
              id: 3,
              name: 'iPhone',
              checked: true,
            },
            {
              id: 4,
              name: 'Android',
              checked: false,
            },
          ],
        },
        {
          id: 5,
          name: 'Laptops',
          checked: false,
          children: [
            {
              id: 6,
              name: 'MacBook',
              checked: true,
            },
            {
              id: 7,
              name: 'Surface Pro',
              checked: false,
            },
          ],
        },
      ],
    },
    {
      id: 8,
      name: 'Books',
      checked: false,
      children: [
        {
          id: 9,
          name: 'Fiction',
          checked: false,
        },
        {
          id: 10,
          name: 'Non-fiction',
          checked: true,
        },
      ],
    },
    {
      id: 11,
      name: 'Toys',
      checked: false,
    },
  ]);

  protected readonly checkboxState = new CheckboxTreeState(this.checkboxesData());
}

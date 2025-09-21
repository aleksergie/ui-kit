import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';
import { ICheckbox } from '@ui-kit/shared';

@Component({
  selector: 'lib-checkbox',
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkbox {
  checkbox = input.required<ICheckbox>();
}

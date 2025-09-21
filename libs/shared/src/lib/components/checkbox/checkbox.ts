import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICheckbox } from '@ui-kit/shared';

@Component({
  selector: 'lib-checkbox',
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkbox {
  checkbox = input.required<ICheckbox>();
  isChecked = computed(() => (this.checkbox()?.checked))
}

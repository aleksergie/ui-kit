import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { Checkbox } from "@ui-kit/shared"

@Component({
  selector: 'lib-checkboxes-list',
  imports: [Checkbox, CommonModule],
  templateUrl: './checkboxes-list.html',
  styleUrl: './checkboxes-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxesList {
  @Input() public checkboxesData: any = [];
  // @Input() public checkboxesData: any = signal([])
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Checkbox, ICheckbox } from "@ui-kit/shared"

@Component({
  selector: 'lib-checkboxes-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkboxes-list.html',
  styleUrl: './checkboxes-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxesList {
  @Input() public checkboxesData: ICheckbox[] = [];

  public ngOnChanges() {
    console.log(this.checkboxesData)
  }

}

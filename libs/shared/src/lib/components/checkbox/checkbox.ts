import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-checkbox',
  imports: [],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkbox {}

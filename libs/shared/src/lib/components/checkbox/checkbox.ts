import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgControl } from '@angular/forms';

@Component({
  selector: 'input[uiCheckbox][type="checkbox"]',
  template: '',
  styles: [
    `
      // :host {
      //   display: inline-flex;
      //   line-height: 1.5;
      //   gap: 1px;
      //   font-size: 18px;
      // }
    `
  ],
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkbox {
  // checkbox = input.required<ICheckbox>();
  // isChecked = computed(() => (this.checkbox().checked))
  control = inject(NgControl, { self: true, optional: true });
  el = inject(ElementRef).nativeElement;

  constructor() {
    console.log('Checkbox component')
  }

  // control = viewChild.required(NgControl);

  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit() {
    this.control?.valueChanges?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      if (value === null) {
        this.el.indeterminate = true;
      }
    })
  }

  // public ngAfterViewInit(): void {
  //   this.control?.valueChanges?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
  //     console.log(value)

  //     if (value === null) {
  //       this.el.querySelector('input').indeterminate = true;
  //     }
  //   })
  // };


}

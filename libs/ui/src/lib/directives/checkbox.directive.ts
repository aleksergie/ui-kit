import {
  Directive,
  DestroyRef,
  ElementRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import { startWith } from 'rxjs';

@Directive({
  selector: 'input[uikCheckbox][type="checkbox"]',
})
export class Checkbox implements OnInit {
  private readonly control = inject(NgControl, { self: true, optional: true });
  private readonly el =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.control?.valueChanges
      ?.pipe(startWith(this.control?.value), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.syncIndeterminate(value);
      });
  }

  private syncIndeterminate(value: unknown): void {
    this.el.indeterminate = value === null;
  }
}

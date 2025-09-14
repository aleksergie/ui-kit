import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NestedCheckboxes } from './nested-checkboxes';

describe('NestedCheckboxes', () => {
  let component: NestedCheckboxes;
  let fixture: ComponentFixture<NestedCheckboxes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NestedCheckboxes],
    }).compileComponents();

    fixture = TestBed.createComponent(NestedCheckboxes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

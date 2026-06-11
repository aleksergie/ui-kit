import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeItemControllerDirective } from '../../directives/tree-item-controller.directive';
import { TreeList } from './tree-list';

interface TestNode {
  readonly id: number;
  readonly name: string;
  readonly children?: readonly TestNode[];
}

const tree: readonly TestNode[] = [
  {
    id: 1,
    name: 'Root',
    children: [
      {
        id: 2,
        name: 'Child',
      },
    ],
  },
];

@Component({
  standalone: true,
  imports: [TreeItemControllerDirective, TreeList],
  template: `
    <uik-tree-list
      [uikTreeController]="true"
      [nodes]="nodes"
      [nodeTemplate]="nodeTemplate"
      [childrenAccessor]="childrenAccessor"
    ></uik-tree-list>

    <ng-template
      #nodeTemplate
      let-node
      let-hasChildren="hasChildren"
      let-expanded="expanded"
      let-toggle="toggle"
    >
      @if (hasChildren) {
        <button type="button" class="toggle" (click)="toggle()">
          {{ expanded ? 'expanded' : 'collapsed' }}
        </button>
      }
      <span class="node">{{ node.name }}</span>
    </ng-template>
  `,
})
class TreeListHost {
  public readonly nodes = tree;

  public readonly childrenAccessor = (node: TestNode): readonly TestNode[] =>
    node.children ?? [];
}

describe('TreeList', () => {
  it('collapses descendants with the tree controller', async () => {
    const fixture = await createFixture(TreeListHost);

    expect(text(fixture)).toContain('Child');

    clickToggle(fixture);
    fixture.detectChanges();

    expect(text(fixture)).not.toContain('Child');
    expect(text(fixture)).toContain('collapsed');
  });
});

async function createFixture<T>(component: new () => T): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [component],
  }).compileComponents();

  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();

  return fixture;
}

function clickToggle<T>(fixture: ComponentFixture<T>): void {
  (fixture.nativeElement as HTMLElement)
    .querySelector<HTMLButtonElement>('.toggle')
    ?.click();
}

function text<T>(fixture: ComponentFixture<T>): string {
  return (fixture.nativeElement as HTMLElement).textContent ?? '';
}

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeControllerDirective } from './tree-controller.directive';
import { TreeItemControllerDirective } from './tree-item-controller.directive';
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
    <lib-tree-list
      [libTreeController]="true"
      [nodes]="nodes"
      [nodeTemplate]="nodeTemplate"
      [childrenAccessor]="childrenAccessor"
    ></lib-tree-list>

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
class UncontrolledHost {
  public readonly nodes = tree;

  public readonly childrenAccessor = (node: TestNode): readonly TestNode[] =>
    node.children ?? [];
}

@Component({
  standalone: true,
  imports: [TreeControllerDirective, TreeList],
  template: `
    <lib-tree-list
      [libTreeController]="false"
      [expandedMap]="expandedMap"
      [nodes]="nodes"
      [nodeTemplate]="nodeTemplate"
      [childrenAccessor]="childrenAccessor"
      (toggled)="onToggled($event)"
    ></lib-tree-list>

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
class ControlledHost {
  public readonly nodes = tree;
  public readonly expandedMap = new Map<TestNode, boolean>();
  public readonly toggled: TestNode[] = [];

  public readonly childrenAccessor = (node: TestNode): readonly TestNode[] =>
    node.children ?? [];

  public onToggled(node: TestNode): void {
    this.toggled.push(node);
  }
}

describe('TreeList', () => {
  it('collapses descendants with the uncontrolled controller', async () => {
    const fixture = await createFixture(UncontrolledHost);

    expect(text(fixture)).toContain('Child');

    clickToggle(fixture);
    fixture.detectChanges();

    expect(text(fixture)).not.toContain('Child');
    expect(text(fixture)).toContain('collapsed');
  });

  it('registers node values for controlled expansion', async () => {
    const fixture = await createFixture(ControlledHost);

    expect(text(fixture)).not.toContain('Child');

    clickToggle(fixture);
    fixture.detectChanges();

    expect(fixture.componentInstance.toggled).toEqual([tree[0]]);
    expect(fixture.componentInstance.expandedMap.get(tree[0])).toBe(true);
    expect(text(fixture)).toContain('Child');
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

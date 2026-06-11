import { CheckboxNode } from '@ui-kit/shared';

import { CheckboxTreeState } from './checkbox-tree.state';

describe('CheckboxTreeState', () => {
  const createTree = (): CheckboxNode[] => [
    {
      id: 1,
      name: 'Parent',
      checked: false,
      children: [
        {
          id: 2,
          name: 'Selected child',
          checked: true,
        },
        {
          id: 3,
          name: 'Empty child',
          checked: false,
        },
      ],
    },
  ];

  it('returns null when descendant leaves have mixed state', () => {
    const [root] = createTree();
    const state = new CheckboxTreeState([root]);

    expect(state.getState(root)).toBeNull();
  });

  it('cascades parent toggles to all descendant leaves', () => {
    const [root] = createTree();
    const state = new CheckboxTreeState([root]);

    state.toggle(root, true);

    const children = root.children ?? [];

    expect(state.getState(root)).toBe(true);
    expect(state.getState(children[0])).toBe(true);
    expect(state.getState(children[1])).toBe(true);
  });

  it('updates parent state when one child changes', () => {
    const [root] = createTree();
    const state = new CheckboxTreeState([root]);
    const children = root.children ?? [];

    state.toggle(root, true);
    state.toggle(children[0], false);

    expect(state.getState(root)).toBeNull();
    expect(state.getState(children[0])).toBe(false);
    expect(state.getState(children[1])).toBe(true);
  });
});

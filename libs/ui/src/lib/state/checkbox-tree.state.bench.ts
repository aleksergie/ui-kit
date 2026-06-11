import { bench, describe } from 'vitest';
import { CheckboxTreeState, type CheckboxTreeNode } from './checkbox-tree.state';

function buildBalanced(depth: number, fanout: number, counter = { n: 1 }): CheckboxTreeNode {
  const id = counter.n++;
  if (depth === 0) return { id, checked: false };
  return {
    id,
    checked: false,
    children: Array.from({ length: fanout }, () => buildBalanced(depth - 1, fanout, counter)),
  };
}

function buildChain(length: number): CheckboxTreeNode {
  let node: CheckboxTreeNode = { id: length, checked: false };
  for (let i = length - 1; i >= 1; i--) {
    node = { id: i, checked: false, children: [node] };
  }
  return node;
}

function flatten(node: CheckboxTreeNode, out: CheckboxTreeNode[] = []): CheckboxTreeNode[] {
  out.push(node);
  if (node.children) for (const c of node.children) flatten(c, out);
  return out;
}

const balancedRoot = buildBalanced(5, 4);
const balancedNodes = flatten(balancedRoot);
const balancedState = new CheckboxTreeState([balancedRoot]);

const chainRoot = buildChain(1000);
const chainNodes = flatten(chainRoot);
const chainState = new CheckboxTreeState([chainRoot]);

describe('getState — one CD pass (call per visible node)', () => {
  bench(`balanced fanout=4 depth=5 (${balancedNodes.length} nodes)`, () => {
    for (const n of balancedNodes) balancedState.getState(n);
  });

  bench(`chain depth=${chainNodes.length}`, () => {
    for (const n of chainNodes) chainState.getState(n);
  });
});

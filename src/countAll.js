export function countAll(node) {
  return node.data.count ?? node.children.length;
}

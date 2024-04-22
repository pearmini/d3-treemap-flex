export function nowrap(node) {
  return node.data.wrap ?? node.children.length;
}

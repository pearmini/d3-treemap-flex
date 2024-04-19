export function directionColumnFirst(node) {
  return node.data.direction || node.depth % 2 === 0 ? "column" : "row";
}

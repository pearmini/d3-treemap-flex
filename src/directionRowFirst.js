export function directionRowFirst(node) {
  return node.data.direction || node.depth % 2 === 0 ? "row" : "column";
}

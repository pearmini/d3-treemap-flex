export function directionSliceDice(node) {
  return node.data.direction || (node.depth & 1 ? "row" : "column");
}

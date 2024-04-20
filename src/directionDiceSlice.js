export function directionDiceSlice(node) {
  return node.data.direction || node.depth & 1 ? "column" : "row";
}

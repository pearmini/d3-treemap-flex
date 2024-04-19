import { sum } from "./sum.js";
import { constant } from "./constant.js";
import { directionColumnFirst } from "./directionColumnFirst.js";
import { countAll } from "./countAll.js";

export function treemapFlex() {
  let direction = directionColumnFirst;
  let count = countAll;

  function partition(parent, x0, y0, x1, y1) {
    const nodes = parent.children;
    if (!nodes) return;

    const values = nodes.map((d) => d.value ?? 1);
    const valuesSum = sum(values);
    const width = x1 - x0;
    const height = y1 - y0;
    const [mainStartKey, crossStartKey, mainEndKey, crossEndKey, mainSize, crossSize, mainStart, crossStart] =
      direction(parent) === "row"
        ? ["x0", "y0", "x1", "y1", width, height, x0, y0]
        : ["y0", "x0", "y1", "x1", height, width, y0, x0];
    const mainCount = count(parent);
    const crossCount = Math.ceil(nodes.length / mainCount);
    const unitWidth = mainSize / mainCount;
    const totalWidth = unitWidth * nodes.length;
    const totalHeight = crossSize;
    const cellHeight = totalHeight / crossCount;

    let y = crossStart;
    for (let i = 0; i < crossCount; i++) {
      let x = mainStart;
      for (let j = 0; j < mainCount; j++) {
        const index = i * mainCount + j;
        const node = nodes[index];
        if (!node) return;
        const cellWidth = (totalWidth * values[index]) / valuesSum;
        node[mainStartKey] = x;
        node[crossStartKey] = y;
        node[mainEndKey] = x + cellWidth;
        node[crossEndKey] = y + cellHeight;
        partition(node, node.x0, node.y0, node.x1, node.y1);
        x += cellWidth;
      }
      y += cellHeight;
    }
  }

  partition.direction = function (x) {
    return arguments.length ? ((direction = typeof x === "function" ? x : constant(x)), partition) : direction;
  };

  partition.count = function (x) {
    return arguments.length ? ((count = typeof x === "function" ? x : constant(+x)), partition) : count;
  };

  return partition;
}

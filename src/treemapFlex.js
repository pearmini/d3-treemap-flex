import { sum } from "./sum.js";
import { constant } from "./constant.js";
import { directionSliceDice } from "./directionSliceDice.js";
import { countAll } from "./countAll.js";

export function treemapFlex() {
  let direction = directionSliceDice;
  let count = countAll;

  function partition(parent, x0, y0, x1, y1) {
    const nodes = parent.children;
    const F = nodes.map((d) => d.value ?? 1);
    const f = sum(F);
    const c = count(parent);
    const n = nodes.length;
    const m = Math.ceil(n / c);
    (direction(parent) === "row" ? dice : slice)();

    function dice() {
      const t = (((x1 - x0) / c) * n) / f;
      const dy = (y1 - y0) / m;
      for (let k = 0, x, y = y0 - dy; k < n; k++) {
        const i = k % c;
        const node = nodes[k];
        node.x0 = x = i ? x : (x = x0);
        node.x1 = x += F[k] * t;
        node.y0 = y = i ? y : (y += dy);
        node.y1 = y + dy;
      }
    }

    function slice() {
      const t = (((y1 - y0) / c) * n) / f;
      const dx = (x1 - x0) / m;
      for (let k = 0, x = x0 - dx, y; k < n; k++) {
        const i = k % c;
        const node = nodes[k];
        node.x0 = x = i ? x : (x += dx);
        node.x1 = x + dx;
        node.y0 = y = i ? y : (y = y0);
        node.y1 = y += F[k] * t;
      }
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

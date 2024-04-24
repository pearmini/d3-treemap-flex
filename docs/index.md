# d3-treemap-flex

[Examples](https://observablehq.com/d/bcf30a9d0d9597b1) · This module implements the tiling method for [d3-treemap](https://d3js.org/d3-hierarchy/treemap) to plot block diagrams. _treemapFlex_ is similar with the built-in tiling methods [_treemapSlice_](https://d3js.org/d3-hierarchy/treemap#treemapSlice), [_treemapDice_](https://d3js.org/d3-hierarchy/treemap#treemapDice) and [_treemapSliceDice_](https://d3js.org/d3-hierarchy/treemap#treemapSliceDice) but with three main differences:

- subdividing area according to each node's individual value rather than the cumulative value of it's descendants
- capable of wrapping like [CSS flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox) according to each node's _wrap_ data attribute
- observing each node's _direction_ data attribute to place child nodes in the specified direction

For example, given the following hierarchy:

```js
const data = {
  name: "root",
  direction: "column",
  children: [
    { name: "a" },
    {
      name: "group",
      direction: "row",
      wrap: 2,
      children: [
        { name: "b", value: 2 },
        { name: "c", value: 1 },
        { name: "d", value: 1 },
        { name: "d", value: 2 },
      ],
    },
  ],
};
```

A treemap with _treemapFlex_ tiling method should be rendered as following:

```js eval code=false t=plot
const treemap = d3.treemap().size([width, height]).tile(d3.treemapFlex()).padding(10);
```

## Resources

- [Releases](https://github.com/pearmini/d3-treemap-flex/releases)
- [Getting help](https://github.com/pearmini/d3-treemap-flex/discussions)

## Installing

d3-treemap-flex is typically installed via a package manager such as NPM or Yarn, and should work with [d3](https://d3js.org/) (or [d3-hierarchy](https://d3js.org/d3-hierarchy) more specifically).

```bash
$ npm i d3 && npm i d3-treemap-flex
```

Then sets treemap layout's tiling method to _treemapFlex_:

```js
import { treemap } from "d3";
import { treemapFlex } from "d3-treemap-flex";

const t = treemap().tile(treemapFlex());

// ...
```

d3-treemap-flex is also available as a UMD bundle for legacy browsers.

```html
<script src="https://cdn.jsdelivr.net/npm/d3"></script>
<script src="https://cdn.jsdelivr.net/npm/d3-treemap-flex"></script>
<script>
  const t = d3.treemap().tile(d3.treemapFlex());

  // ...
</script>
```

## API Reference

### treemapFlex() {#treemapFlex}

[Source](https://github.com/pearmini/d3-treemap-flex/blob/main/src/treemapFlex.js)· Creates a new treemapFlex tiling method with default settings, which observes node's _wrap_ and _direction_ data attribute if treemapFlex's [wrap](#wrap) and [direction](#direction) is not specified.

```js eval code=false
padding = Inputs.range([0, 30], { label: "Padding", step: 1, value: 10 });
```

```js eval t=plot
const treemap = d3
  .treemap()
  .size([width, height])
  .tile(d3.treemapFlex()) // Sets tiling method.
  .padding(padding);
```

### _treemapFlex_.wrap(_wrap_) {#wrap}

[Source](https://github.com/pearmini/d3-treemap-flex/blob/main/src/treemapFlex.js)· If _wrap_ is specified, sets the wrap count to the specified number or function and returns this treemapFlex tiling method. If _wrap_ is not specified, returns the current wrap count function, which defaults to observe node's wrap data attribute.

```js eval code=false
wrap = Inputs.range([1, 4], { label: "Wrap count", step: 1, value: 4 });
```

```js eval t=plott
const treemap = d3
  .treemap()
  .size([width, height])
  .tile(
    d3
      .treemapFlex() // Sets wrap count for elements in group.
      .wrap((d) => (d.data.name === "group" ? wrap : d.children.length)),
  )
  .padding(10);
```

### _treemapFlex_.direction(_direction_) {#direction}

[Source](https://github.com/pearmini/d3-treemap-flex/blob/main/src/treemapFlex.js)· If _direction_ is specified, sets the placing direction to the specified direction or function and returns this treemapFlex tiling method. If _direction_ is not specified, returns the current direction function, which defaults to [directionSliceDice](#directionSliceDice). If direction sets to _column_, divides the rectangular area vertically according the value of each of the specified node’s children. If direction sets to _row_, divides the rectangular area horizontally according the value of each of the specified node’s children.

```js eval code=false
direction = Inputs.radio(["column", "row"], {
  label: "Direction",
  value: "column",
});
```

```js eval t=plott
const treemap = d3
  .treemap()
  .size([width, height])
  .tile(
    d3
      .treemapFlex() // Sets direction.
      .direction(direction),
  )
  .padding(10);
```

### directionDiceSlice {#directionDiceSlice}

[Source](https://github.com/pearmini/d3-treemap-flex/blob/main/src/directionDiceSlice.js)· If current node has odd depth, divides the rectangular area vertically; otherwise divides the rectangular area horizontally.

```js eval t=plott
const treemap = d3
  .treemap()
  .size([width, height])
  .tile(
    d3
      .treemapFlex() // Sets direction to directionDiceSlice.
      .direction(d3.directionDiceSlice),
  )
  .padding(10);
```

### directionSliceDice {#directionSliceDice}

[Source](https://github.com/pearmini/d3-treemap-flex/blob/main/src/directionSliceDice.js)· If current node has odd depth, divides the rectangular area horizontally; otherwise divides the rectangular area vertically.

```js eval t=plott
const treemap = d3
  .treemap()
  .size([width, height])
  .tile(
    d3
      .treemapFlex() // Sets direction to directionSliceDice.
      .direction(d3.directionSliceDice),
  )
  .padding(10);
```

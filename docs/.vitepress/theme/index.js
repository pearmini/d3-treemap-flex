import DefaultTheme from "vitepress/theme";
import Layout from "genji-theme-vitepress";
import { h } from "vue";
import * as d3TreemapFlex from "../../../src";
import { hierarchy, treemap, create, scaleOrdinal, hsl, sort, schemeObservable10 } from "d3";
import "./custom.css";

function plotTreemap(nodes, { width, height }) {
  const color = scaleOrdinal()
    .domain(sort(Array.from(new Set(nodes.map((d) => d.height)))))
    .range(schemeObservable10);

  const svg = create("svg").attr("viewBox", `0 0 ${width} ${height}`);

  const g = svg
    .selectAll("g")
    .data(nodes)
    .join("g")
    .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

  g.append("rect")
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("fill", (d) => (d.depth === 0 ? "#fff" : hsl(color(d.height)).brighter(1.2)))
    .attr("stroke", (d) => (d.depth === 0 ? "#fff" : color(d.height)));

  g.filter((d) => !d.children)
    .append("text")
    .attr("x", (d) => (d.x1 - d.x0) / 2)
    .attr("y", (d) => (d.y1 - d.y0) / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .text((d) => d.data.name);

  return svg.node();
}

function plot(code) {
  return `
  (() => {
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
            { name: "e", value: 2 },
          ],
        },
      ],
    };
    const height = width * 0.618;
    ${code}
    const root = treemap(d3.hierarchy(data));
    return plotTreemap(root.descendants(), { width, height });
  })();
  `;
}

function plott(code) {
  return `
  (() => {
    const data = {
      name: "root",
      children: [
        { name: "a" },
        {
          name: "group",
          children: [
            { name: "b" },
            { name: "c" },
            { name: "d" },
            { name: "e" },
          ],
        },
      ],
    };
    const height = width * 0.618;
    ${code}
    const root = treemap(d3.hierarchy(data));
    return plotTreemap(root.descendants(), { width, height });
  })();
  `;
}

const props = {
  Theme: DefaultTheme,
  library: {
    d3: {
      ...d3TreemapFlex,
      hierarchy,
      treemap,
    },
    plotTreemap,
  },
  transform: {
    plot,
    plott,
  },
};

export default {
  extends: DefaultTheme,
  Layout: () => h(Layout, props),
};

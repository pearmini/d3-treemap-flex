import { it, expect } from "vitest";
import { readFileSync } from "fs";
import { treemap, hierarchy } from "d3-hierarchy";
import { treemapFlex, directionSliceDice, directionDiceSlice } from "../src/index.js";
import { countAll } from "../src/countAll.js";
import { round } from "./round.js";

const alphabet = JSON.parse(readFileSync("./test/data/alphabet.json"));

it("treemapFlex() has the expected defaults", () => {
  const t = treemapFlex();
  expect(t.direction()).toBe(directionSliceDice);
  expect(t.count()).toBe(countAll);
});

it("treemapFlex should compute the expected layout", () => {
  const t = treemap().size([640, 640]).tile(treemapFlex()).round(true);
  const root = t(hierarchy(alphabet));
  const nodes = root.descendants().map(round);
  expect(nodes).toEqual([
    { x0: 0, y0: 0, x1: 640, y1: 640 },
    { x0: 0, y0: 0, x1: 640, y1: 213 },
    { x0: 0, y0: 213, x1: 640, y1: 427 },
    { x0: 0, y0: 427, x1: 640, y1: 640 },
    { x0: 0, y0: 213, x1: 320, y1: 427 },
    { x0: 320, y0: 213, x1: 640, y1: 427 },
    { x0: 0, y0: 427, x1: 91, y1: 640 },
    { x0: 91, y0: 427, x1: 183, y1: 640 },
    { x0: 183, y0: 427, x1: 274, y1: 640 },
    { x0: 274, y0: 427, x1: 366, y1: 640 },
    { x0: 366, y0: 427, x1: 457, y1: 640 },
    { x0: 457, y0: 427, x1: 549, y1: 640 },
    { x0: 549, y0: 427, x1: 640, y1: 640 },
    { x0: 0, y0: 213, x1: 160, y1: 320 },
    { x0: 0, y0: 320, x1: 160, y1: 427 },
    { x0: 160, y0: 213, x1: 320, y1: 320 },
    { x0: 160, y0: 320, x1: 320, y1: 427 },
  ]);
});

it("treemapFlex should observe constant direction", () => {
  const tile = treemapFlex().direction("row");
  expect(tile.direction()()).toBe("row");

  const t = treemap().size([640, 640]).tile(tile).round(true);
  const root = t(hierarchy(alphabet));
  const nodes = root.descendants().map(round);
  console.log(JSON.stringify(nodes));
  expect(nodes).toEqual([
    { x0: 0, y0: 0, x1: 640, y1: 640 },
    { x0: 0, y0: 0, x1: 213, y1: 640 },
    { x0: 213, y0: 0, x1: 427, y1: 640 },
    { x0: 427, y0: 0, x1: 640, y1: 640 },
    { x0: 213, y0: 0, x1: 320, y1: 640 },
    { x0: 320, y0: 0, x1: 427, y1: 640 },
    { x0: 427, y0: 0, x1: 457, y1: 640 },
    { x0: 457, y0: 0, x1: 488, y1: 640 },
    { x0: 488, y0: 0, x1: 518, y1: 640 },
    { x0: 518, y0: 0, x1: 549, y1: 640 },
    { x0: 549, y0: 0, x1: 579, y1: 640 },
    { x0: 579, y0: 0, x1: 610, y1: 640 },
    { x0: 610, y0: 0, x1: 640, y1: 640 },
    { x0: 213, y0: 0, x1: 267, y1: 320 },
    { x0: 267, y0: 0, x1: 320, y1: 320 },
    { x0: 213, y0: 320, x1: 267, y1: 640 },
    { x0: 267, y0: 320, x1: 320, y1: 640 },
  ]);
});

it("treemapFlex should observe the specified functional direction", () => {
  const tile = treemapFlex().direction(directionDiceSlice);
  expect(tile.direction()).toBe(directionDiceSlice);

  const t = treemap().size([640, 640]).tile(tile).round(true);
  const root = t(hierarchy(alphabet));
  const nodes = root.descendants().map(round);
  expect(nodes).toEqual([
    { x0: 0, y0: 0, x1: 640, y1: 640 },
    { x0: 0, y0: 0, x1: 213, y1: 640 },
    { x0: 213, y0: 0, x1: 427, y1: 640 },
    { x0: 427, y0: 0, x1: 640, y1: 640 },
    { x0: 213, y0: 0, x1: 427, y1: 320 },
    { x0: 213, y0: 320, x1: 427, y1: 640 },
    { x0: 427, y0: 0, x1: 640, y1: 91 },
    { x0: 427, y0: 91, x1: 640, y1: 183 },
    { x0: 427, y0: 183, x1: 640, y1: 274 },
    { x0: 427, y0: 274, x1: 640, y1: 366 },
    { x0: 427, y0: 366, x1: 640, y1: 457 },
    { x0: 427, y0: 457, x1: 640, y1: 549 },
    { x0: 427, y0: 549, x1: 640, y1: 640 },
    { x0: 213, y0: 0, x1: 320, y1: 160 },
    { x0: 320, y0: 0, x1: 427, y1: 160 },
    { x0: 213, y0: 160, x1: 320, y1: 320 },
    { x0: 320, y0: 160, x1: 427, y1: 320 },
  ]);
});

it("treemapFlex should observe the specified constant count", () => {
  const tile = treemapFlex().count(2);
  expect(tile.count()()).toBe(2);

  const t = treemap().size([640, 640]).tile(tile).round(true);
  const root = t(hierarchy(alphabet));
  const nodes = root.descendants().map(round);
  expect(nodes).toEqual([
    { x0: 0, y0: 0, x1: 640, y1: 640 },
    { x0: 0, y0: 0, x1: 320, y1: 320 },
    { x0: 0, y0: 320, x1: 320, y1: 640 },
    { x0: 320, y0: 0, x1: 640, y1: 320 },
    { x0: 0, y0: 320, x1: 160, y1: 640 },
    { x0: 160, y0: 320, x1: 320, y1: 640 },
    { x0: 320, y0: 0, x1: 480, y1: 80 },
    { x0: 480, y0: 0, x1: 640, y1: 80 },
    { x0: 320, y0: 80, x1: 480, y1: 160 },
    { x0: 480, y0: 80, x1: 640, y1: 160 },
    { x0: 320, y0: 160, x1: 480, y1: 240 },
    { x0: 480, y0: 160, x1: 640, y1: 240 },
    { x0: 320, y0: 240, x1: 480, y1: 320 },
    { x0: 0, y0: 320, x1: 80, y1: 480 },
    { x0: 0, y0: 480, x1: 80, y1: 640 },
    { x0: 80, y0: 320, x1: 160, y1: 480 },
    { x0: 80, y0: 480, x1: 160, y1: 640 },
  ]);
});

it("treemapFlex should observe the specified functional count", () => {
  const two = () => 2;
  const tile = treemapFlex().count(two);
  expect(tile.count()).toBe(two);

  const t = treemap().size([640, 640]).tile(tile).round(true);
  const root = t(hierarchy(alphabet));
  const nodes = root.descendants().map(round);
  expect(nodes).toEqual([
    { x0: 0, y0: 0, x1: 640, y1: 640 },
    { x0: 0, y0: 0, x1: 320, y1: 320 },
    { x0: 0, y0: 320, x1: 320, y1: 640 },
    { x0: 320, y0: 0, x1: 640, y1: 320 },
    { x0: 0, y0: 320, x1: 160, y1: 640 },
    { x0: 160, y0: 320, x1: 320, y1: 640 },
    { x0: 320, y0: 0, x1: 480, y1: 80 },
    { x0: 480, y0: 0, x1: 640, y1: 80 },
    { x0: 320, y0: 80, x1: 480, y1: 160 },
    { x0: 480, y0: 80, x1: 640, y1: 160 },
    { x0: 320, y0: 160, x1: 480, y1: 240 },
    { x0: 480, y0: 160, x1: 640, y1: 240 },
    { x0: 320, y0: 240, x1: 480, y1: 320 },
    { x0: 0, y0: 320, x1: 80, y1: 480 },
    { x0: 0, y0: 480, x1: 80, y1: 640 },
    { x0: 80, y0: 320, x1: 160, y1: 480 },
    { x0: 80, y0: 480, x1: 160, y1: 640 },
  ]);
});

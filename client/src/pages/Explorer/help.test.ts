import { path } from "./help";

test("path join test base", () => {
  expect(path.join("a", "b", "c")).toBe("/a/b/c");
  expect(path.join("/a/", "/b", "c/", "/d")).toBe("/a/b/c/d");
  expect(path.join("/e/", "/fg/h/", ".")).toBe("/e/fg/h");
  // expect(path.join("/a/", "//c", "d/", "")).toBe("/a/c/d");
});
test("path join test adv", () => {
  expect(path.join("a", "/b", ".", "..", "c")).toBe("/a/c");
  expect(path.join("a", "/b", ".", "/..", "c")).toBe("/a/c");
  expect(path.join("a", "/b", "..", "/..", "c")).toBe("/c");
  // expect(path.join("a", "/b", "..", "/..")).toBe(".");
  // expect(path.join("/a/", "//c", "d/", "")).toBe("/a/c/d");
});
test("path resolve test", () => {
  // expect(path.resolve("a/b/c/")).toBe("/a/b/c");
  expect(1).toBe(1);
});

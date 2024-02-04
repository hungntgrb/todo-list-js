import appState from "../../appState";

test("should initialize properly", () => {
  const state = new appState();
  expect(state.tasks).toEqual([]);
});

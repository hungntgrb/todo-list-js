const { zeroLengthOrAllSpace, removeHTML } = require("../src/js/utils");

test("should return !NOINPUT for zero-length or all-space input", () => {
  expect(zeroLengthOrAllSpace("")).toEqual("!NOINPUT");
  expect(zeroLengthOrAllSpace(" ")).toEqual("!NOINPUT");
});

test("should remove all HTML tags from text", () => {
  expect(removeHTML("Hung is handsome")).toEqual("Hung is handsome");
  expect(removeHTML('<input type="text">')).toEqual("");
  expect(removeHTML("<div>This is a div</div>")).toEqual("This is a div");
});

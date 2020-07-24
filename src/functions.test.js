const { sanitizeInput } = require("./escapeUserInput");

test("should remove HTML tags within user's input", () => {
  expect(sanitizeInput("hung")).toEqual("hung");
  expect(sanitizeInput("<input>Hello")).toStrictEqual("Hello");
});

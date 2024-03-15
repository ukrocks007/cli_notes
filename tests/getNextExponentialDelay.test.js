const { getNextExponentialDelay } = require("../lib");

describe("getNextExponentialDelay", () => {
  // Returns a delay twice as long as the input delay
  it("should return a delay twice as long as the input delay", () => {
    const delay = 1000;
    const nextDelay = getNextExponentialDelay(delay);
    expect(nextDelay).toBe(delay * 2);
  });

  // Returns a delay of 60000 when input delay is 40000 and the next delay would be greater than 60000
  it("should return a delay of 60000 when input delay is 40000 and the next delay would be greater than 60000", () => {
    const delay = 40000;
    const nextDelay = getNextExponentialDelay(delay);
    expect(nextDelay).toBe(60000);
  });
});

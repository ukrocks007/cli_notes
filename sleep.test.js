const { sleep } = require("./lib");

describe("sleep", () => {
  // Sleep for a given number of milliseconds
  it("should sleep for the given number of milliseconds", async () => {
    const delay = 1000;
    const start = Date.now();
    await sleep(delay);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(delay);
  });

  // Delay is 0
  it("should resolve immediately when delay is 0", async () => {
    const delay = 0;
    const start = Date.now();
    await sleep(delay);
    const end = Date.now();
    expect(end - start).toBeLessThan(10);
  });
});

const { checkTodos } = require("./lib");

describe("checkTodos", () => {
  // Fetches todos successfully in parallel mode
  it("should fetch todos successfully in parallel mode", async () => {
    await checkTodos(false);
  });

  // Fetches todos successfully in serial mode
  it("should fetch todos successfully in serial mode", async () => {
    await checkTodos(true);
  });

  // Prints the title and completed status of each todo
  it("should print the title and completed status of each todo", async () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    await checkTodos(false);
    expect(consoleLogSpy).toHaveBeenCalledTimes(21);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining("-"));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining("true"));
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("false")
    );
    consoleLogSpy.mockRestore();
  });

  // Returns execution time in seconds
  it("should return execution time in seconds", async () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    await checkTodos(false);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("Execution time:")
    );
    consoleLogSpy.mockRestore();
  });
});

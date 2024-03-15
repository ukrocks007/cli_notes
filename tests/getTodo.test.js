const { json } = require("stream/consumers");
const { getTodo } = require("../lib");

describe("getTodo", () => {
  // Successfully fetches a todo with valid id and returns it
  it("should fetch a todo with valid id and return it", async () => {
    const todo = await getTodo(1);
    expect(todo).toBeDefined();
    expect(todo.title).toBeDefined();
    expect(todo.completed).toBeDefined();
  });

  // Retries fetching a todo with server errors and resolves after maximum retries
  it("should retry fetching a todo with server errors and resolve after maximum retries", async () => {
    const id = 1;
    const maxRetries = 3;
    let retries = 0;
    jest.spyOn(global, "fetch").mockImplementation(() => {
      retries++;
      if (retries <= maxRetries) {
        return Promise.resolve({
          ok: false,
        });
      } else {
        return Promise.resolve({
          ok: true,
          json: () => ({
            title: "Todo Title",
            completed: false,
          }),
        });
      }
    });

    const result = await getTodo(id);
    expect(result).toEqual({
      title: "Todo Title",
      completed: false,
    });
    expect(retries).toBe(maxRetries + 1);

    global.fetch.mockRestore();
  }, 10000);

  // Retries fetching a todo with invalid response and resolves after maximum retries
  it("should retry fetching a todo with server errors and resolve after maximum retries", async () => {
    const id = 1;
    const maxRetries = 1;
    let retries = 0;
    jest.spyOn(global, "fetch").mockImplementation(() => {
      retries++;
      if (retries <= maxRetries) {
        return Promise.resolve({
          ok: true,
          json: () => ({})
        });
      } else {
        return Promise.resolve({
          ok: true,
          json: () => ({
            title: "Todo Title",
            completed: false,
          }),
        });
      }
    });

    const result = await getTodo(id);
    expect(result).toEqual({
      title: "Todo Title",
      completed: false,
    });
    expect(retries).toBe(maxRetries + 1);

    global.fetch.mockRestore();
  }, 10000);

  // Retries fetching a todo with invalid response and resolves after maximum retries
  it("should retry fetching a todo with server errors and resolve after maximum retries", async () => {
    const id = 1;
    const maxRetries = 1;
    let retries = 0;
    jest.spyOn(global, "fetch").mockImplementation(() => {
      retries++;
      if (retries <= maxRetries) {
        return Promise.resolve({
          ok: true,
          json: () => (undefined)
        });
      } else {
        return Promise.resolve({
          ok: true,
          json: () => ({
            title: "Todo Title",
            completed: false,
          }),
        });
      }
    });

    const result = await getTodo(id);
    expect(result).toEqual({
      title: "Todo Title",
      completed: false,
    });
    expect(retries).toBe(maxRetries + 1);

    global.fetch.mockRestore();
  }, 10000);
});

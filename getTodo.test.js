const { getTodo } = require("./lib");

describe("getTodo", () => {
  // Successfully fetches a todo with valid id and returns it
  it("should fetch a todo with valid id and return it", async () => {
    const todo = await getTodo(1);
    expect(todo).toBeDefined();
    expect(todo.title).toBeDefined();
    expect(todo.completed).toBeDefined();
  });
});

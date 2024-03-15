const getTodo = async (id) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch todo');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const init = async () => {
  console.time('init');
  try {
    const promises = Array.from({ length: 20 }, (_, index) => getTodo((index + 1) * 2));
    const todos = await Promise.all(promises);
    todos.forEach((todo) => console.log(`${todo.title} - ${todo.completed}`));
  } catch (error) {
    console.error(error);
  }
  console.timeEnd('init');
};
init();

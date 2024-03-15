const getTodo = async (id) => {
  return new Promise((resolve, reject) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch((error) => reject(error));
  });
};

const init = async () => {
  console.time('init');
  try {
    for (let i = 2; i <= 40; i += 2) {
      const todo = await getTodo(i);
      console.log(`${todo.title} - ${todo.completed}`);
    }
  } catch (error) {
    console.error(error);
  }
  console.timeEnd('init');
};
init();

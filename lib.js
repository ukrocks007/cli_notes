/**
 * Fetches a todo from the jsonplaceholder API
 * @param {*} id Id of the todo to fetch
 * @returns Todo object
 */
const getTodo = async (id) => {
  // Initial delay for exponential backoff
  let delay = 1000;
  do {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch todo");
      }
      const json = await response.json();
      // Validate the response
      if (!json) {
        throw new Error("Failed to parse response");
      }
      // Validate the response
      if (!json.title) {
        throw new Error("Invalid todo");
      }
      return json;
    } catch (error) {
      console.log(`Retrying in ${delay / 1000} seconds...`);
      await sleep(delay);
      delay = getNextExponentialDelay(delay);
    }
  } while (true);
};

/**
 * Sometimes due to rate limits or network issues serial fetching performs better than parallel fetching.
 * So both the modes are supported.
 * @param {*} serial Set to true to fetch todos serially
 */
const checkTodos = async (serial = false) => {
  const startTimestamp = Date.now();
  try {
    let todos = [];
    if (serial) {
      // Serial fetching
      for (let index = 0; index < 20; index++) {
        const todo = await getTodo((index + 1) * 2);
        todos.push(todo);
      }
    } else {
      // Parallel fetching
      const promises = Array.from({ length: 20 }, (_, index) =>
        getTodo((index + 1) * 2)
      );
      todos = await Promise.all(promises);
    }
    // Print the todos title and completed status
    todos.forEach((value) =>
      console.log(`${value.title} - ${value.completed}`)
    );
  } catch (error) {
    console.error(error);
  } finally {
    // Print the execution time
    console.log(`Execution time: ${(Date.now() - startTimestamp) / 1000} s`);
  }
};

/**
 * Faced with a network request timeout errors while testing the getTodo function so I implemented exponential backoff to handle the retries.
 * @param {*} delay Last delay used for exponential backoff
 * @returns Next delay to be used for exponential backoff
 */
function getNextExponentialDelay(delay) {
  const nextDelay = delay * 2;
  return nextDelay > 60 * 1000 ? 60 * 1000 : nextDelay;
}

/**
 * Function to sleep for a given number of milliseconds
 * @param {*} delay Number of milliseconds to sleep
 * @returns Promise that resolves after the given delay
 */
async function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

module.exports = { getTodo, checkTodos, getNextExponentialDelay, sleep };

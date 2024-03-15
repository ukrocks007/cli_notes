const { argv } = require("process");
const { checkTodos } = require("./lib");

if (argv.length > 2 && argv[2] === "-h") {
  console.log("Usage: node index.js [-s|-h]");
  console.log("Use -s to fetch todos serially");
  console.log("Use -h to print this help message");
  process.exit(0);
}
checkTodos(argv[2] === "-s");
